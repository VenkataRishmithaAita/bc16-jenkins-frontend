import groovy.transform.Field

podTemplate(label: 'bc16', containers: [
	containerTemplate(name: 'docker', image: 'docker:19.03', command: 'cat', ttyEnabled: true)],
	volumes: [hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')]
) 
{
    node('bc16'){


        environment {
        //VERSION = "${env.GIT_COMMIT}"
        DOCKERHUB_CREDENTIALS= credentials('rishmitha-dockerhub')
        //MY_KUBECONFIG = credentials('config-file')
    }
    withEnv([
        "VERSION=${env.BUILD_NUMBER}",


    ]){
    stage('Checkout Source') {
     
        git 'https://github.com/VenkataRishmithaAita/bc16-jenkins-frontend.git'
      
    }
	    
	    stage('Build Docker'){
         
          
            container('docker'){

            sh 'docker build -t rishmitha/fe_jenkins:${VERSION} .'
            sh 'docker images'
            
        }
	    }
	    
	    stage('Push Docker'){
	        
	            container('docker'){
	            
	            
	            
	            withCredentials([usernamePassword(credentialsId: 'rishmitha-dockerhub', usernameVariable: 'username', passwordVariable: 'password')]) {
  sh 'echo $PASSWORD'
               sh 'docker login -u $username -p $password'
  echo USERNAME

  echo "username is $USERNAME"

	            //sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
	            sh 'docker push rishmitha/fe_jenkins:${VERSION}'
	            }
	           
	        
	        }
	    }

//          stage ('Invoking helm build') {
        	
// 		    build job: 'bc16-r', parameters: [string(name: 'be_version', value: env.BUILD_NUMBER)]
// 	    }

	    		   stage ('BC16-GC') {
        	
		    build job: 'bc16-r', parameters: [string(name: 'master', value: env.BRANCH_NAME)]
	
        }
    }
	    
    }

}
