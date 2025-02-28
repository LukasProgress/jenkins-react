pipeline {
    agent any

    environment {
        EC2_HOST="52.59.221.148"
        USER="ubuntu"
        SERVER_PATH="/var/www/html"
    }

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                    url: "https://github.com/LukasProgress/jenkins-react"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build the App') {
            steps {
                sh 'npm run build'
                sh 'ls -la'
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-access',
                    keyFileVariable: 'EC2_KEY',
                    usernameVariable: 'UBUNTU'
                )]) {
                    // Neue version hochladen:
                    sh '''
                        scp -o StrictHostKeyChecking=no \
                        -i $EC2_KEY \
                        -r build \
                        $UBUNTU@$EC2_HOST:/home/ubuntu/build
                    '''
                    // Alte version löschen, neue version rüberkopieren, nginx neustarten: 
                    sh '''
                        ssh -o StrictHostKeyChecking=no \
                        -i $EC2_KEY \
                        $UBUNTU@$EC2_HOST \
                        "sudo rm -rf $SERVER_PATH/* &&
                        sudo cp -r /home/ubuntu/build/* $SERVER_PATH/ &&
                        sudo systemctl restart nginx
                        "
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    def response = sh(
                        script: "curl -s -o /dev/null -w '%{http_code}' http://$EC2_HOST/",
                        returnStdout: true
                    ).trim()

                    if (response == "200") {
                        echo "Deployment successful!"
                    } else {
                        echo "Deployment unsuccessfuöl :("
                    }
                }
            }
        }

    }

    post {
        always {
            echo 'SCM webhook funktioniert!'
        }
    }
}