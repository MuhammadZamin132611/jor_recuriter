pipeline {
    environment{
    AWS_ACCOUNT_ID="065103812889"
    AWS_DEFAULT_REGION="ap-south-1"
    IMAGE_REPO_NAME="jobcheck-recruiters-app-new"
    IMAGE_TAG="$BUILD_NUMBER"
    REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
  }
  agent {
  label 'dev'
}
  stages {


        
     stage('Build docker image'){
      steps{
        echo "Building docker image"
        script{
          sh "docker system prune -f"
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
        }
      }
    }

   
    stage('Logging into AWS ECR') {
            steps {
                script {
                sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 065103812889.dkr.ecr.ap-south-1.amazonaws.com"
                }
                 
            }
        }
    // Uploading Docker images into AWS ECR    
    stage('Push docker image'){
      steps{
        echo "Pushing docker image"
        script{
          sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
          sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
           
        }
      }      
    }

  }
}