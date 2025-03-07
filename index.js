const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Expanded question pool for AWS Cloud Practitioner
const questions = [
    // Cloud Concepts (26% of exam)
    {
        question: "Which of the following is a fundamental characteristic of cloud computing according to AWS?",
        options: ["Elasticity", "Virtualization", "GUI Management", "Hardware procurement"],
        correctOption: 0 // Elasticity
    },
    {
        question: "What is the AWS shared responsibility model?",
        options: ["AWS is responsible for everything", "Customers are responsible for everything", "AWS and customers share responsibility for security", "Third-party vendors manage all security"],
        correctOption: 2 // AWS and customers share responsibility for security
    },
    {
        question: "Which cloud computing deployment model is AWS an example of?",
        options: ["Private cloud", "Public cloud", "Hybrid cloud", "Multi-cloud"],
        correctOption: 1 // Public cloud
    },
    {
        question: "Which of the following is NOT a benefit of cloud computing?",
        options: ["Trade capital expense for variable expense", "Benefit from massive economies of scale", "Increased maintenance of physical hardware", "Increased speed and agility"],
        correctOption: 2 // Increased maintenance of physical hardware
    },
    {
        question: "What is the primary advantage of the AWS pay-as-you-go pricing model?",
        options: ["All resources are free for the first year", "Customers can predict exact costs years in advance", "Customers only pay for resources they use", "AWS manages all aspects of the infrastructure"],
        correctOption: 2 // Customers only pay for resources they use
    },
    {
        question: "Which cloud computing model provides the customer with the most control over the infrastructure?",
        options: ["Software as a Service (SaaS)", "Platform as a Service (PaaS)", "Infrastructure as a Service (IaaS)", "Desktop as a Service (DaaS)"],
        correctOption: 2 // Infrastructure as a Service (IaaS)
    },
    {
        question: "What does the 'elasticity' characteristic of cloud computing refer to?",
        options: ["The ability to use flexible pricing models", "The ability to quickly deploy applications globally", "The ability to scale resources up and down as needed", "The ability to migrate applications between clouds"],
        correctOption: 2 // The ability to scale resources up and down as needed
    },
    {
        question: "Which aspect of the cloud allows businesses to innovate faster?",
        options: ["Lower costs", "High availability", "Reduced time to market", "Enhanced security"],
        correctOption: 2 // Reduced time to market
    },
    {
        question: "Which advantage of cloud computing allows businesses to operate globally in minutes?",
        options: ["Massive economies of scale", "High availability", "Global reach", "Automatic software updates"],
        correctOption: 2 // Global reach
    },
    {
        question: "What is the benefit of a cloud environment in terms of capital investment?",
        options: ["Predictable monthly costs", "Eliminating upfront infrastructure expense", "Reduced operational costs", "Simplified budgeting"],
        correctOption: 1 // Eliminating upfront infrastructure expense
    },
    {
        question: "Which of the following is a responsibility of AWS according to the shared responsibility model?",
        options: ["Securing customer data", "Managing network configurations", "Physical security of data centers", "Identity and access management"],
        correctOption: 2 // Physical security of data centers
    },
    {
        question: "Which cloud computing model is best described as 'infrastructure as code'?",
        options: ["Software as a Service", "Platform as a Service", "Infrastructure as a Service", "Function as a Service"],
        correctOption: 2 // Infrastructure as a Service
    },
    {
        question: "Which cloud benefit allows you to focus on business projects rather than infrastructure?",
        options: ["Elasticity", "Security", "Agility", "Cost savings"],
        correctOption: 2 // Agility
    },
    
    // Security and Compliance (25% of exam)
    {
        question: "Which AWS service provides a virtual network dedicated to your AWS account?",
        options: ["Internet Gateway", "VPC", "Route 53", "Direct Connect"],
        correctOption: 1 // VPC
    },
    {
        question: "Which AWS service can be used to store and manage encryption keys?",
        options: ["AWS Certificate Manager", "AWS Key Management Service (KMS)", "AWS Secrets Manager", "AWS Identity and Access Management (IAM)"],
        correctOption: 1 // AWS Key Management Service (KMS)
    },
    {
        question: "Which of the following is a shared responsibility of both AWS and the customer?",
        options: ["Physical security of data centers", "Patch management for the guest OS", "Configuration of infrastructure devices", "Encryption of data at rest"],
        correctOption: 3 // Encryption of data at rest
    },
    {
        question: "Which AWS service allows you to analyze resource configurations for security compliance?",
        options: ["AWS Config", "AWS Inspector", "AWS Trusted Advisor", "AWS GuardDuty"],
        correctOption: 0 // AWS Config
    },
    {
        question: "Which AWS service is designed to protect applications from distributed denial-of-service (DDoS) attacks?",
        options: ["AWS WAF", "AWS Shield", "AWS Firewall Manager", "Amazon GuardDuty"],
        correctOption: 1 // AWS Shield
    },
    {
        question: "What is the primary purpose of AWS Identity and Access Management (IAM)?",
        options: ["Manage encryption keys", "Control access to AWS resources", "Monitor AWS account activity", "Create virtual private networks"],
        correctOption: 1 // Control access to AWS resources
    },
    {
        question: "Which service tracks API calls for your account and delivers log files?",
        options: ["CloudTrail", "CloudWatch", "GuardDuty", "Inspector"],
        correctOption: 0 // CloudTrail
    },
    {
        question: "Which AWS service helps you protect sensitive data by discovering, classifying, and protecting it?",
        options: ["Amazon Inspector", "Amazon Macie", "AWS Artifact", "AWS WAF"],
        correctOption: 1 // Amazon Macie
    },
    {
        question: "Which feature of AWS allows you to enforce secure configurations across services?",
        options: ["Service control policies (SCPs)", "IAM policies", "VPC security groups", "NACL rules"],
        correctOption: 0 // Service control policies (SCPs)
    },
    {
        question: "What is the purpose of AWS Artifact?",
        options: ["Manage encryption keys", "Search for security vulnerabilities", "Access AWS compliance reports", "Monitor suspicious account activity"],
        correctOption: 2 // Access AWS compliance reports
    },
    {
        question: "Which AWS service automatically assesses potential security issues in your applications?",
        options: ["AWS Config", "AWS Inspector", "AWS Trusted Advisor", "AWS GuardDuty"],
        correctOption: 1 // AWS Inspector
    },
    {
        question: "Which service provides web application firewall capabilities for your AWS resources?",
        options: ["AWS Shield", "AWS WAF", "AWS Firewall Manager", "AWS Network Firewall"],
        correctOption: 1 // AWS WAF
    },
    {
        question: "Which service maintains the hardware security of AWS data centers?",
        options: ["The customer", "Third-party auditors", "AWS", "Shared between AWS and customer"],
        correctOption: 2 // AWS
    },
    
    // Technology (33% of exam)
    {
        question: "Which AWS service is primarily used for storing objects?",
        options: ["EC2", "S3", "RDS", "DynamoDB"],
        correctOption: 1 // S3
    },
    {
        question: "Which AWS service allows you to run code without provisioning or managing servers?",
        options: ["EC2", "Lambda", "ECS", "Elastic Beanstalk"],
        correctOption: 1 // Lambda
    },
    {
        question: "Which AWS service would you use for relational databases?",
        options: ["DynamoDB", "S3", "RDS", "ElastiCache"],
        correctOption: 2 // RDS
    },
    {
        question: "Which AWS service is used for content delivery to reduce latency?",
        options: ["CloudFront", "Route 53", "Global Accelerator", "ELB"],
        correctOption: 0 // CloudFront
    },
    {
        question: "Which AWS service would you use for NoSQL databases?",
        options: ["RDS", "Redshift", "DynamoDB", "Aurora"],
        correctOption: 2 // DynamoDB
    },
    {
        question: "Which AWS service provides managed Kubernetes clusters?",
        options: ["ECS", "Fargate", "EKS", "Batch"],
        correctOption: 2 // EKS
    },
    {
        question: "Which AWS service would you use for data warehousing?",
        options: ["RDS", "Redshift", "DynamoDB", "DocumentDB"],
        correctOption: 1 // Redshift
    },
    {
        question: "Which AWS service provides a fully managed load balancing service?",
        options: ["CloudFront", "API Gateway", "Elastic Load Balancing", "Global Accelerator"],
        correctOption: 2 // Elastic Load Balancing
    },
    {
        question: "Which AWS service is used for DNS management?",
        options: ["CloudFront", "Route 53", "Certificate Manager", "Direct Connect"],
        correctOption: 1 // Route 53
    },
    {
        question: "Which AWS service allows you to provision and manage multiple AWS services as a single application?",
        options: ["AWS Config", "CloudFormation", "CloudWatch", "Systems Manager"],
        correctOption: 1 // CloudFormation
    },
    {
        question: "Which AWS service provides a fully managed message queue for microservices?",
        options: ["SNS", "SQS", "Kinesis", "EventBridge"],
        correctOption: 1 // SQS
    },
    {
        question: "Which service provides real-time monitoring of AWS resources?",
        options: ["AWS Config", "CloudTrail", "CloudWatch", "EventBridge"],
        correctOption: 2 // CloudWatch
    },
    {
        question: "Which AWS service provides a fully managed backup service?",
        options: ["AWS Backup", "AWS Storage Gateway", "Amazon S3", "Amazon Glacier"],
        correctOption: 0 // AWS Backup
    },
    {
        question: "Which AWS service is used to store and process data using SQL?",
        options: ["Redshift", "Athena", "ElasticSearch", "Neptune"],
        correctOption: 1 // Athena
    },
    {
        question: "Which AWS service is used for container orchestration?",
        options: ["Lambda", "EC2", "ECS", "AppRunner"],
        correctOption: 2 // ECS
    },
    {
        question: "Which AWS service offers managed Apache Kafka?",
        options: ["Amazon MSK", "Amazon MQ", "Amazon SNS", "Amazon SQS"],
        correctOption: 0 // Amazon MSK
    },
    {
        question: "Which AWS service provides managed data transfer via physical devices?",
        options: ["AWS DataSync", "AWS Transfer Family", "AWS Snow Family", "AWS Direct Connect"],
        correctOption: 2 // AWS Snow Family
    },
    {
        question: "Which AWS service is used for creating and managing APIs?",
        options: ["AWS AppSync", "AWS API Gateway", "AWS App Runner", "AWS Amplify"],
        correctOption: 1 // AWS API Gateway
    },
    {
        question: "Which AWS service is optimized for machine learning model training?",
        options: ["AWS SageMaker", "AWS Rekognition", "AWS Comprehend", "AWS Polly"],
        correctOption: 0 // AWS SageMaker
    },
    {
        question: "Which AWS service helps you run operational workloads in the cloud?",
        options: ["AWS Systems Manager", "AWS Config", "AWS CloudFormation", "AWS OpsWorks"],
        correctOption: 0 // AWS Systems Manager
    },
    {
        question: "Which AWS service is used for interactive log analytics?",
        options: ["CloudWatch", "CloudTrail", "OpenSearch Service", "Athena"],
        correctOption: 2 // OpenSearch Service
    },
    
    // Billing and Pricing (16% of exam)
    {
        question: "Which AWS pricing model offers the highest discount for long-term commitments?",
        options: ["On-Demand", "Reserved Instances", "Spot Instances", "Savings Plans"],
        correctOption: 1 // Reserved Instances
    },
    {
        question: "Which AWS service helps you analyze your AWS bill and optimize costs?",
        options: ["AWS Budgets", "AWS Cost Explorer", "AWS Organizations", "AWS Trusted Advisor"],
        correctOption: 1 // AWS Cost Explorer
    },
    {
        question: "Which AWS support plan includes access to a Technical Account Manager (TAM)?",
        options: ["Developer", "Basic", "Business", "Enterprise"],
        correctOption: 3 // Enterprise
    },
    {
        question: "Which AWS service allows you to set custom cost and usage budgets?",
        options: ["AWS Billing Console", "AWS Budgets", "AWS Cost and Usage Report", "AWS Cost Explorer"],
        correctOption: 1 // AWS Budgets
    },
    {
        question: "What is the AWS Free Tier designed to do?",
        options: ["Provide lifetime free services", "Help new AWS customers get started in the cloud", "Offer promotional credits for startups", "Reduce costs for enterprise customers"],
        correctOption: 1 // Help new AWS customers get started in the cloud
    },
    {
        question: "Which pricing model is best for temporary workloads with flexible start and end times?",
        options: ["Reserved Instances", "On-Demand Instances", "Spot Instances", "Dedicated Hosts"],
        correctOption: 2 // Spot Instances
    },
    {
        question: "Which of the following can help reduce Amazon S3 storage costs?",
        options: ["Amazon S3 lifecycle policies", "AWS Shield", "AWS WAF", "AWS Control Tower"],
        correctOption: 0 // Amazon S3 lifecycle policies
    },
    {
        question: "Which AWS support plan is free for all AWS customers?",
        options: ["Developer", "Basic", "Business", "Enterprise"],
        correctOption: 1 // Basic
    },
    {
        question: "Which AWS service provides recommendations for cost optimization?",
        options: ["AWS Budgets", "AWS Cost Explorer", "AWS Trusted Advisor", "AWS Organizations"],
        correctOption: 2 // AWS Trusted Advisor
    },
    {
        question: "Which of the following can help identify unutilized Amazon EC2 instances?",
        options: ["AWS Cost Explorer", "AWS Trusted Advisor", "AWS Service Catalog", "AWS CloudTrail"],
        correctOption: 1 // AWS Trusted Advisor
    },
    {
        question: "Which service offers flexible pricing options for compute capacity with commitments of 1 or 3 years?",
        options: ["AWS Savings Plans", "AWS Spot Instances", "AWS On-Demand", "AWS Pay-as-you-go"],
        correctOption: 0 // AWS Savings Plans
    },
    
    // Additional Common Questions
    {
        question: "Which AWS service uses machine learning to provide business insights and forecasts?",
        options: ["Amazon Forecast", "Amazon QuickSight", "Amazon Athena", "Amazon EMR"],
        correctOption: 0 // Amazon Forecast
    },
    {
        question: "Which AWS service provides fully managed file storage system for EC2 instances?",
        options: ["S3", "EBS", "EFS", "Storage Gateway"],
        correctOption: 2 // EFS
    },
    {
        question: "Which service would you use to create a serverless REST API?",
        options: ["Amazon API Gateway", "AWS AppSync", "AWS Elastic Beanstalk", "AWS App Runner"],
        correctOption: 0 // Amazon API Gateway
    },
    {
        question: "Which service can automatically adjust the number of EC2 instances based on demand?",
        options: ["Elastic Load Balancing", "Auto Scaling", "AWS Lambda", "Amazon SageMaker"],
        correctOption: 1 // Auto Scaling
    },
    {
        question: "Which AWS technology allows you to run your applications in the AWS Cloud and on-premises?",
        options: ["AWS Direct Connect", "AWS Lambda", "AWS Outposts", "AWS VPN"],
        correctOption: 2 // AWS Outposts
    },
    {
        question: "What is the primary purpose of AWS Organizations?",
        options: ["Monitor resources across multiple AWS accounts", "Manage billing across multiple AWS accounts", "Enforce security policies across multiple AWS accounts", "Provide high availability across multiple AWS regions"],
        correctOption: 2 // Enforce security policies across multiple AWS accounts
    },
    {
        question: "Which AWS database service is best suited for time-series data?",
        options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Timestream", "Amazon DocumentDB"],
        correctOption: 2 // Amazon Timestream
    },
    {
        question: "Which AWS service enables you to detect anomalies in your AWS account activities?",
        options: ["AWS GuardDuty", "AWS Inspector", "AWS Macie", "AWS Security Hub"],
        correctOption: 0 // AWS GuardDuty
    },
    {
        question: "Which AWS networking service enables you to connect your data center to AWS via a dedicated network connection?",
        options: ["AWS Direct Connect", "AWS Site-to-Site VPN", "AWS Transit Gateway", "AWS PrivateLink"],
        correctOption: 0 // AWS Direct Connect
    },
    {
        question: "Which AWS service allows you to manage your software licenses in the cloud?",
        options: ["AWS Systems Manager", "AWS License Manager", "AWS Directory Service", "AWS Resource Access Manager"],
        correctOption: 1 // AWS License Manager
    }
];

// API endpoint to get random AWS questions
app.get('/api/random-aws-questions', (req, res) => {
    // Get query parameter for number of questions, default to 65
    const count = parseInt(req.query.count) || 65;
    
    // Make sure we don't request more questions than we have
    const questionCount = Math.min(count, questions.length);
    
    // Create a deep copy of the questions to avoid reference issues
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    
    // Shuffle thoroughly using Fisher-Yates algorithm
    for (let i = questionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
    }
    
    // Take the first 'count' questions
    const selectedQuestions = questionsCopy.slice(0, questionCount);
    
    // Log how many questions are being sent
    console.log(`Sending ${selectedQuestions.length} random questions to client`);
    
    // Return the questions
    res.json(selectedQuestions);
});

// Serve the index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});