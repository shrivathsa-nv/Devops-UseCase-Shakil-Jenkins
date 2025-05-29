pipeline {
    agent any

    environment {
        TOMCAT_WEBAPPS_DIR = '/opt/tomcat/webapps'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Ensure that we are using the correct Git installation
                git url: 'https://github.com/shakilmunavary/AI-Powered-Jenkins-BuildFailure-Management', branch: 'master'
            }
        }

        stage('Build with Maven') {
            steps {
                // Corrected the typo from 'mvnn' to 'mvn'
                sh 'mvn clean package'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                sh '''
                    sudo cp target/java-tomcat-maven-example.war ${TOMCAT_WEBAPPS_DIR}/
                '''
            }
        }
    }

    post {
        always {
            // Clean up the workspace
            cleanWs()
        }
    }
}