pipeline {
    agent any

    environment {
        TOMCAT_WEBAPPS_DIR = '/opt/tomcat/webapps'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Ensure that we are using the correct Git installation
                git url: 'https://github.com/shrivathsa-nv/Devops-UseCase-Shakil-Jenkins', branch: 'main'
                //checkout scm
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
