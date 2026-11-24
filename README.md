Online Shoppers Purchasing Intention Prediction Using Machine Learning

A single-page website that presents my Machine Learning lab project: predicting whether an online shopper will complete a purchase.

Course: DS 422 – Machine Learning Driven Data Analysis Lab I (DS Major)
University: Daffodil International University
Project type: Binary Classification
Dataset: Online Shoppers Purchasing Intention Dataset (UCI)

Project Summary
Goal: Predict the Revenue target (purchase or no purchase) from browsing-session data.
Data: 12,330 original records, 125 duplicates removed, 12,205 cleaned records, 17 features + 1 target.
Preprocessing: median imputation + StandardScaler for numerical features, One-Hot Encoding for categorical features.
Split: 80% training (9,764) / 20% testing (2,441), stratified, random_state=42.
Algorithms: Logistic Regression, Decision Tree, Random Forest.
Results (test set)
Algorithm	Accuracy	Precision	Recall	F1-Score	ROC-AUC
Logistic Regression	0.8513	0.5164	0.7853	0.6231	0.9109
Decision Tree	0.8603	0.5385	0.7513	0.6273	0.8551
Random Forest	0.8984	0.6782	0.6675	0.6728	0.9272

Best model: Random Forest. Logistic Regression has the highest recall.
Top features (Random Forest): PageValues, ExitRates, ProductRelated_Duration.

Website Sections

Hero · Overview · Problem & Objectives · Dataset · EDA · Methodology · Algorithms · Performance · Evaluation · Discussion · Conclusion · References

Project Structure 
online-shoppers-ml-website/ 
├── index.html 
├── css/style.css 
├── js/script.js 
├── assets/images/ (figures from the lab report) 
└── README.md
