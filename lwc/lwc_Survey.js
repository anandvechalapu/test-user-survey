//lwc.js
import { LightningElement, wire, track } from 'lwc';
//importing necessary modules
import getSurveys from '@salesforce/apex/SurveyController.getSurveys';

export default class LWC_Survey extends LightningElement {
  @track surveys; // array to store surveys
  @track surveyArray; //array to store survey details

  //wired method to get surveys
  @wire(getSurveys)
  wiredSurvey({ error, data }) {
    if (data) {
      // if surveys are present, set it to surveys variable
      this.surveys = data;
      //iterate over each survey
      this.surveys.forEach(survey => {
        //validate if user is logged in
        if (this.validateUser()) {
          //check if user has already completed/skipped survey
          if (!this.validateSurvey(survey)) {
            //if survey is valid, push it to surveyArray
            this.surveyArray.push(survey);
          }
        }
      });
    } else if (error) {
      //If there is an error, log the error
      console.log(error);
    }
  }

  //method to validate user
  validateUser() {
    //validate if user is logged in
    return true;
  }

  //method to validate survey
  validateSurvey(survey) {
    //check if user has already completed/skipped survey
    return false;
  }

  //method to skip survey
  skipSurvey(surveyId) {
    //remove survey from surveyArray
    const index = this.surveyArray.findIndex(s => s.Id === surveyId);
    this.surveyArray.splice(index, 1);
  }
}