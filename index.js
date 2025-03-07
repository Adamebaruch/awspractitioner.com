const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample questions for AWS Cloud Practitioner
const questions = [
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
        question: "Which of the following is a fundamental characteristic of cloud computing according to AWS?",
        options: ["Elasticity", "Virtualization", "GUI Management", "Hardware procurement"],
        correctOption: 0 // Elasticity
    },
    {
        question: "Which AWS service provides a virtual network dedicated to your AWS account?",
        options: ["Internet Gateway", "VPC", "Route 53", "Direct Connect"],
        correctOption: 1 // VPC
    },
    {
        question: "Which AWS support plan includes access to a Technical Account Manager (TAM)?",
        options: ["Developer", "Basic", "Business", "Enterprise"],
        correctOption: 3 // Enterprise
    },
    {
        question: "Which AWS service is used for content delivery to reduce latency?",
        options: ["CloudFront", "Route 53", "Global Accelerator", "ELB"],
        correctOption: 0 // CloudFront
    },
    {
        question: "Which AWS pricing model offers the highest discount for long-term commitments?",
        options: ["On-Demand", "Reserved Instances", "Spot Instances", "Savings Plans"],
        correctOption: 1 // Reserved Instances
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
        question: "Which of the following is a shared responsibility of both AWS and the customer?",
        options: ["Physical security of data centers", "Patch management for the guest OS", "Configuration of infrastructure devices", "Encryption of data at rest"],
        correctOption: 3 // Encryption of data at rest
    },
    {
        question: "Which AWS service helps you analyze your AWS bill and optimize costs?",
        options: ["AWS Budgets", "AWS Cost Explorer", "AWS Organizations", "AWS Trusted Advisor"],
        correctOption: 1 // AWS Cost Explorer
    },
    {
        question: "Which AWS service provides real-time monitoring of AWS resources?",
        options: ["AWS Config", "CloudTrail", "CloudWatch", "EventBridge"],
        correctOption: 2 // CloudWatch
    },
    {
        question: "Which AWS service tracks API calls for your account and delivers log files?",
        options: ["CloudTrail", "CloudWatch", "GuardDuty", "Inspector"],
        correctOption: 0 // CloudTrail
    },
    {
        question: "Which AWS service provides a fully managed backup service?",
        options: ["AWS Backup", "AWS Storage Gateway", "Amazon S3", "Amazon Glacier"],
        correctOption: 0 // AWS Backup
    }
];

// API endpoint to get random AWS questions
app.get('/api/random-aws-questions', (req, res) => {
    // Get query parameter for number of questions, default to 10
    const count = parseInt(req.query.count) || 10;
    
    // Create a deep copy of the questions to avoid reference issues
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    
    // Shuffle more thoroughly using Fisher-Yates algorithm
    for (let i = questionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
    }
    
    // Take the first 'count' questions
    const selectedQuestions = questionsCopy.slice(0, count);
    
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