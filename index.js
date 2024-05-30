const express = require('express');
const path = require('path');
const app = express();
const port = 3003; // Ensure this is the correct port

// Sample questions
const questions = [
    {
        text: 'What does S3 stand for?',
        options: ['Simple Storage Service', 'Secure Storage Service', 'Simple Secure Storage', 'None of the above'],
        correctAnswer: 'Simple Storage Service'
    },
    {
        text: 'Which AWS service is used for compute capacity?',
        options: ['Amazon RDS', 'Amazon EC2', 'Amazon S3', 'Amazon CloudFront'],
        correctAnswer: 'Amazon EC2'
    },
    {
        text: 'What is the main benefit of Amazon RDS?',
        options: ['Automated scaling', 'Managed relational database service', 'File storage service', 'Content delivery network'],
        correctAnswer: 'Managed relational database service'
    },
    {
        text: 'Which AWS service can be used for object storage?',
        options: ['Amazon EC2', 'Amazon S3', 'Amazon RDS', 'Amazon VPC'],
        correctAnswer: 'Amazon S3'
    },
    {
        text: 'What is the primary purpose of Amazon CloudFront?',
        options: ['Compute service', 'Database service', 'Content delivery network', 'Networking service'],
        correctAnswer: 'Content delivery network'
    },
    {
        text: 'What is AWS Lambda used for?',
        options: ['Running serverless applications', 'Object storage', 'Relational database service', 'Virtual private cloud'],
        correctAnswer: 'Running serverless applications'
    },
    {
        text: 'Which service is used for scalable data warehousing?',
        options: ['Amazon Redshift', 'Amazon DynamoDB', 'Amazon RDS', 'Amazon S3'],
        correctAnswer: 'Amazon Redshift'
    },
    {
        text: 'Which AWS service offers a fully managed NoSQL database?',
        options: ['Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon DynamoDB'
    },
    {
        text: 'What is the primary function of Amazon Route 53?',
        options: ['Compute service', 'Domain Name System (DNS) web service', 'Data warehousing', 'Content delivery'],
        correctAnswer: 'Domain Name System (DNS) web service'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service is designed to migrate databases to AWS easily and securely?',
        options: ['AWS Database Migration Service (DMS)', 'Amazon RDS', 'Amazon Aurora', 'AWS Data Pipeline'],
        correctAnswer: 'AWS Database Migration Service (DMS)'
    },
    {
        text: 'Which AWS service can be used to deploy and manage infrastructure using code?',
        options: ['AWS CloudFormation', 'AWS OpsWorks', 'AWS Elastic Beanstalk', 'AWS CodeDeploy'],
        correctAnswer: 'AWS CloudFormation'
    },
    {
        text: 'What is the purpose of Amazon S3 Glacier?',
        options: ['File storage', 'Object storage', 'In-memory caching', 'Long-term data archiving'],
        correctAnswer: 'Long-term data archiving'
    },
    {
        text: 'Which AWS service provides a fully managed container orchestration service?',
        options: ['Amazon ECS', 'Amazon EKS', 'AWS Fargate', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        text: 'Which AWS service allows you to run Kubernetes on AWS?',
        options: ['Amazon ECS', 'Amazon EKS', 'AWS Lambda', 'Amazon EMR'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which service is used for real-time data processing of streaming data?',
        options: ['Amazon Kinesis', 'AWS Data Pipeline', 'Amazon EMR', 'Amazon Athena'],
        correctAnswer: 'Amazon Kinesis'
    },
    {
        text: 'What does AWS WAF stand for?',
        options: ['Web Application Firewall', 'Wide Area Firewall', 'Web Application Framework', 'Wide Area Framework'],
        correctAnswer: 'Web Application Firewall'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service can be used for creating and running virtual servers?',
        options: ['Amazon EC2', 'Amazon RDS', 'Amazon Lightsail', 'AWS Lambda'],
        correctAnswer: 'Amazon EC2'
    },
    {
        text: 'Which AWS service offers managed, scalable, and durable block storage?',
        options: ['Amazon EBS', 'Amazon S3', 'Amazon Glacier', 'Amazon EFS'],
        correctAnswer: 'Amazon EBS'
    },
    {
        text: 'Which AWS service can be used to accelerate the delivery of content?',
        options: ['Amazon CloudFront', 'Amazon Route 53', 'AWS Direct Connect', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon CloudFront'
    },
    {
        text: 'Which AWS service is used to manage encryption keys?',
        options: ['AWS KMS', 'AWS Shield', 'AWS IAM', 'AWS CloudHSM'],
        correctAnswer: 'AWS KMS'
    },
    {
        text: 'Which AWS service can be used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'What does AWS IAM stand for?',
        options: ['Identity and Access Management', 'Internal Application Management', 'Infrastructure and Access Management', 'Identity and Application Management'],
        correctAnswer: 'Identity and Access Management'
    },
    {
        text: 'Which AWS service provides a petabyte-scale data warehouse solution?',
        options: ['Amazon Redshift', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon Redshift'
    },
    {
        text: 'Which service allows you to transfer large amounts of data via physical devices?',
        options: ['AWS Snowball', 'AWS Data Pipeline', 'AWS Direct Connect', 'AWS VPN'],
        correctAnswer: 'AWS Snowball'
    },
    {
        text: 'Which AWS service is used for batch processing?',
        options: ['AWS Batch', 'AWS Lambda', 'Amazon EC2', 'Amazon EMR'],
        correctAnswer: 'AWS Batch'
    },
    {
        text: 'Which service can be used to store and retrieve any amount of data, at any time, from anywhere on the web?',
        options: ['Amazon S3', 'Amazon RDS', 'Amazon Glacier', 'Amazon EBS'],
        correctAnswer: 'Amazon S3'
    },
    {
        text: 'Which service is used for managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which service provides a simple and cost-effective way to launch and manage virtual private servers?',
        options: ['Amazon Lightsail', 'Amazon EC2', 'Amazon VPC', 'AWS Lambda'],
        correctAnswer: 'Amazon Lightsail'
    },
    {
        text: 'Which service provides a fully managed file storage service for use with AWS Cloud services and on-premises resources?',
        options: ['Amazon EFS', 'Amazon S3', 'Amazon EBS', 'Amazon Glacier'],
        correctAnswer: 'Amazon EFS'
    },
    {
        text: 'Which service provides secure, resizable compute capacity in the cloud as EC2 instances?',
        options: ['Amazon EC2', 'AWS Lambda', 'Amazon RDS', 'Amazon Redshift'],
        correctAnswer: 'Amazon EC2'
    },
    {
        text: 'Which service offers a managed distributed ledger that makes it easy to create and manage scalable blockchain networks?',
        options: ['Amazon Managed Blockchain', 'Amazon QLDB', 'AWS Blockchain Templates', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Managed Blockchain'
    },
    {
        text: 'Which AWS service provides a fully managed graph database service?',
        options: ['Amazon Neptune', 'Amazon DynamoDB', 'Amazon RDS', 'Amazon Redshift'],
        correctAnswer: 'Amazon Neptune'
    },
    {
        text: 'Which service provides on-demand, scalable, serverless data processing service that enables you to analyze large volumes of streaming data in real time?',
        options: ['Amazon Kinesis', 'AWS Glue', 'AWS Data Pipeline', 'Amazon EMR'],
        correctAnswer: 'Amazon Kinesis'
    },
    {
        text: 'Which service helps you build conversational interfaces for applications using voice and text?',
        options: ['Amazon Lex', 'Amazon Polly', 'Amazon Transcribe', 'Amazon Rekognition'],
        correctAnswer: 'Amazon Lex'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service is used for running large-scale parallel and high-performance computing (HPC) applications?',
        options: ['AWS ParallelCluster', 'Amazon EC2', 'AWS Lambda', 'AWS Fargate'],
        correctAnswer: 'AWS ParallelCluster'
    },
    {
        text: 'Which service can be used for building, deploying, and running machine learning models?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which service can be used for event-driven compute service that lets you run code in response to events?',
        options: ['AWS Lambda', 'AWS Step Functions', 'Amazon EC2', 'Amazon EKS'],
        correctAnswer: 'AWS Lambda'
    },
    {
        text: 'Which service is used for simple, scalable, reliable, and cost-effective data pipeline for data-driven workflows?',
        options: ['AWS Data Pipeline', 'AWS Glue', 'Amazon Kinesis', 'Amazon EMR'],
        correctAnswer: 'AWS Data Pipeline'
    },
    {
        text: 'Which service can be used to add facial recognition and analysis to your applications?',
        options: ['Amazon Rekognition', 'Amazon Polly', 'Amazon Comprehend', 'Amazon Lex'],
        correctAnswer: 'Amazon Rekognition'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which service is designed for fast, consistent, and predictable performance with seamless scalability?',
        options: ['Amazon DynamoDB', 'Amazon RDS', 'Amazon Redshift', 'Amazon Aurora'],
        correctAnswer: 'Amazon DynamoDB'
    },
    {
        text: 'Which service provides fully managed service to help you run Apache Hadoop and Spark workloads?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which service is designed to provide a high-performance, scalable file storage solution for use with AWS and on-premises resources?',
        options: ['Amazon FSx', 'Amazon S3', 'Amazon EFS', 'Amazon EBS'],
        correctAnswer: 'Amazon FSx'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service provides a managed message broker service for Apache ActiveMQ that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MQ', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MQ'
    },
    {
        text: 'Which AWS service is used to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service allows you to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service allows you to create and manage a collection of related AWS resources that can be provisioned and updated in an orderly and predictable fashion?',
        options: ['AWS CloudFormation', 'AWS OpsWorks', 'AWS Elastic Beanstalk', 'AWS CodePipeline'],
        correctAnswer: 'AWS CloudFormation'
    },
    {
        text: 'Which AWS service is used to transfer large amounts of data into and out of the AWS Cloud using physical storage appliances?',
        options: ['AWS Snowball', 'AWS Data Pipeline', 'AWS Direct Connect', 'AWS VPN'],
        correctAnswer: 'AWS Snowball'
    },
    {
        text: 'Which AWS service helps you build and deploy applications that provide highly secure and scalable access to AWS services?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides real-time, on-demand analytics for structured and semi-structured data using standard SQL queries?',
        options: ['Amazon Redshift', 'Amazon Athena', 'AWS Glue', 'Amazon QuickSight'],
        correctAnswer: 'Amazon Athena'
    },
    {
        text: 'Which AWS service provides on-demand, scalable, and serverless ETL (extract, transform, load) service?',
        options: ['AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis', 'Amazon EMR'],
        correctAnswer: 'AWS Glue'
    },
    {
        text: 'Which AWS service can be used to manage encryption keys and control their use across a wide range of AWS services and applications?',
        options: ['AWS KMS', 'AWS CloudHSM', 'AWS Shield', 'AWS IAM'],
        correctAnswer: 'AWS KMS'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon EC2'],
        correctAnswer: 'Amazon Cloudwatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a way to create, deploy, and manage microservices using Docker containers?',
        options: ['Amazon ECS', 'AWS Lambda', 'AWS Fargate', 'AWS Step Functions'],
        correctAnswer: 'Amazon ECS'
    },
    {
        text: 'Which AWS service can be used to run and scale containerized applications on Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service provides managed DDoS protection for your web applications?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Firewall Manager', 'Amazon GuardDuty'],
        correctAnswer: 'AWS Shield'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service is used to manage and scale containerized applications using Kubernetes?',
        options: ['Amazon EKS', 'Amazon ECS', 'AWS Fargate', 'AWS Batch'],
        correctAnswer: 'Amazon EKS'
    },
    {
        text: 'Which AWS service can be used to send email, SMS, and push notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Kafka that makes it easy to set up and operate message brokers in the cloud?',
        options: ['Amazon MSK', 'Amazon SQS', 'Amazon SNS', 'AWS Lambda'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service is used to automate the deployment of applications?',
        options: ['AWS CodeDeploy', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS CodeCommit'],
        correctAnswer: 'AWS CodeDeploy'
    },
    {
        text: 'Which AWS service is used for monitoring and observability?',
        options: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon SNS', 'Amazon SQS'],
        correctAnswer: 'Amazon CloudWatch'
    },
    {
        text: 'Which AWS service provides a way to quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications?',
        options: ['AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS CodeDeploy', 'AWS OpsWorks'],
        correctAnswer: 'AWS Elastic Beanstalk'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    {
        text: 'Which AWS service provides a highly scalable and cost-effective solution for backing up and archiving data?',
        options: ['Amazon S3 Glacier', 'Amazon EBS', 'Amazon EFS', 'Amazon RDS'],
        correctAnswer: 'Amazon S3 Glacier'
    },
    {
        text: 'Which AWS service is used to provide managed, scalable MySQL-compatible databases?',
        options: ['Amazon Aurora', 'Amazon RDS', 'Amazon Redshift', 'Amazon DynamoDB'],
        correctAnswer: 'Amazon Aurora'
    },
    {
        text: 'Which AWS service helps you build and deploy highly secure and scalable APIs?',
        options: ['AWS API Gateway', 'AWS Lambda', 'AWS Step Functions', 'AWS Amplify'],
        correctAnswer: 'AWS API Gateway'
    },
    {
        text: 'Which AWS service provides a fully managed service for Apache Hadoop and Apache Spark that makes it easy to process large amounts of data?',
        options: ['Amazon EMR', 'AWS Glue', 'AWS Data Pipeline', 'Amazon Kinesis'],
        correctAnswer: 'Amazon EMR'
    },
    {
        text: 'Which AWS service provides highly scalable DNS service designed to route end users to Internet applications by translating names into the numeric IP addresses?',
        options: ['Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront', 'AWS Transit Gateway'],
        correctAnswer: 'Amazon Route 53'
    },
    {
        text: 'Which AWS service is designed to provide a highly scalable, highly available, and managed Apache Kafka service?',
        options: ['Amazon MSK', 'Amazon Kinesis', 'Amazon SQS', 'Amazon SNS'],
        correctAnswer: 'Amazon MSK'
    },
    {
        text: 'Which AWS service can be used to send notifications to multiple destinations?',
        options: ['Amazon SNS', 'Amazon SQS', 'AWS Lambda', 'Amazon SES'],
        correctAnswer: 'Amazon SNS'
    },
    {
        text: 'Which AWS service provides a highly scalable, managed, and secure Redis or Memcached service?',
        options: ['Amazon ElastiCache', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora'],
        correctAnswer: 'Amazon ElastiCache'
    },
    {
        text: 'Which AWS service helps you build and deploy machine learning models quickly and efficiently?',
        options: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Polly'],
        correctAnswer: 'Amazon SageMaker'
    },
    // Add more questions as needed
];

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

app.get('/api/random-aws-questions', (req, res) => {
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    const randomQuestions = shuffledQuestions.slice(0, 10); // Adjust the number of questions as needed
    res.json(randomQuestions);
});

app.listen(port, () => {
    console.log(`AWS practice API running at http://localhost:${port}`);
});