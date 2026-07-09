import { LightningElement, api, wire } from 'lwc';
import getLatestScore from '@salesforce/apex/EnrollmentScoreController.getLatestScore';

export default class EnrollmentScoreCard extends LightningElement {
    @api recordId;
    scoreRecord;
    error;

    @wire(getLatestScore, { contactId: '$recordId' })
    wiredScore({ error, data }) {
        if (data) {
            this.scoreRecord = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.scoreRecord = undefined;
        }
    }

    get badgeClass() {
        const score = this.scoreRecord ? this.scoreRecord.Score__c : null;
        let baseClass = 'slds-badge slds-var-p-horizontal_small ';
        if (score >= 75) return baseClass + 'badge-hot';
        if (score >= 40) return baseClass + 'badge-warm';
        return baseClass + 'badge-cold';
    }

    get badgeLabel() {
        const score = this.scoreRecord ? this.scoreRecord.Score__c : null;
        if (score >= 75) return '🔴 Hot';
        if (score >= 40) return '🟠 Warm';
        return '🔵 Cold';
    }
}
