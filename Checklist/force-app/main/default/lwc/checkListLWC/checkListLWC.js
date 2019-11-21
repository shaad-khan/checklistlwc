import { LightningElement, wire, track,api  } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference,NavigationMixin } from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/CheckList__c';
import INDUSTRY_FIELD from '@salesforce/schema/CheckList__c.Type_of_checklist__c';
import SREGION from '@salesforce/schema/CheckList__c.SalesRegion__c';
import SQUOTE from '@salesforce/schema/CheckList__c.Signed_Quotation__c';
import  PORDER from '@salesforce/schema/CheckList__c.Purchase_Order_Received__c';
import  TEXMPT from '@salesforce/schema/CheckList__c.Is_this_customer_tax_exempt__c';
import Quotedata from '@salesforce/apex/getQuoteData.Quotedata';
import dp_lc from '@salesforce/schema/CheckList__c.DP_LP__c';
import dcom from '@salesforce/schema/CheckList__c.Dealer_Commission__c';
import dpayment from '@salesforce/schema/CheckList__c.Down_Payment_Invoice_Needed__c'
/*import getQuoteline from '@salesforce/apex/lwcclone.getQuoteline';
import getQuotegrp from '@salesforce/apex/lwcclone.getQuotegrp';
import getResults from '@salesforce/apex/lwcclone.getResults';
import cloneopty from '@salesforce/apex/lwcclone.cloneopty';*/
//import NAME_FIELD from '@salesforce/schema/Account.Name';
//import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
//import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class checkListLWC extends NavigationMixin(LightningElement) {
   
    @track recordId='';
    @track value;
    @track amount;
    @track pinfo=false;
    @track qdata;
    @track qname;
    @track dcom1;
    @track qcurrency;
    @track cinfo=true;
    @track showTabTv=false;
    @track showTabRadio=false;
    @track region;
    @track country;
    @track dpayment1;
    @track smanager;
    @track amanager;
    @track apayable;
    @track dp_lc1;
    @track customer;
    @track sgroup;
    @track signQuote;
    @track porder1;
    @track pnumber;
    @track taxex;
  @api objectApiName;
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

   @track show="step-1";

  

  @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD})
    ChecklistValue;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SREGION})
    salesregion;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SQUOTE})
    signedQ;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: PORDER})
    porder;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TEXMPT})
    texmpt;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: dp_lc})
    dp_lc;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: dcom})
    dcom;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: dpayment})
    dpayment;
    handleChange(event) {
        this.value = event.detail.value;
        if(this.value=="TV CHECKLIST")
        {
            this.showTabTv=true;
            this.showTabRadio=false;
        }
        if(this.value=="RADIO CHECKLIST")
        {
            this.showTabTv=false;
            this.showTabRadio=true;
        }
       
        
    }
    handlechangeform(event)
    {
        if(event.target.name==='region')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.region=event.target.value;
        }
        if(event.target.name==='country')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.country=event.target.value;
        }
        if(event.target.name==='smanager')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.smanager=event.target.value;
        }
        if(event.target.name==='customer')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.customer=event.target.value;
        }
        if(event.target.name==='sgroup')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.sgroup=event.target.value;
        }
        if(event.target.name==='signQuote')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.signQuote=event.target.value;
        }
        if(event.target.name==='pnumber')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.pnumber=event.target.value;
        }
        if(event.target.name==='porder1')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.porder1=event.target.value;
        }
        if(event.target.name==='amanager')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.amanager=event.target.value;
        }
        if(event.target.name==='taxex')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.taxex=event.target.value;
        }
        if(event.target.name==='dcom1')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.dcom1=event.target.value;
        }
        if(event.target.name==='amount')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.amount=event.target.value;
        }
        if(event.target.name==='apayable')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.apayable=event.target.value;
        }
        if(event.target.name==='dpayment1')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.dpayment1=event.target.value;
        }
        if(event.target.name==='dp_lc1')
        {
         // eslint-disable-next-line no-console
         console.log("region"+event.target.value);
         this.dp_lc1=event.target.value;
        }
    }
    @wire(CurrentPageReference)
    currentPageReference; 
    get recordIdFromState(){
        //console.log(this.currentPageReference.state.c__recordId);
               return this.currentPageReference &&
            this.currentPageReference.state.c__recordId; 
    }


    /*@wire(Quotedata, {Id:this.recordId })   wiredcost({ error, data }) {
        if (data) {
           // eslint-disable-next-line no-console
         //  console.log(JSON.stringify(data));
           //this.count=data;
         
           this.qdata=data;
           // eslint-disable-next-line no-console
           console.log("qdata"+JSON.stringify(data));
           this.qname=data[0].name;
        } else if (error) {
            //this.error = error;
            // eslint-disable-next-line no-console
            console.log(error);
           // this.count = undefined;
        }
    }*/
     connectedCallback() {
         // eslint-disable-next-line no-unused-expressions
         this.recordId=this.recordIdFromState;

Quotedata({Id:this.recordId}).then(result=>{
    //console.log("qdata:"+JSON.stringify(result));
this.qname=result[0].Name;
this.qcurrency=result[0].Quote_Currency__c;
this.region=result[0].SBQQ__Account__r.Region__c;
console.log(JSON.stringify(result[0]));
});
 
     }
     toggle1(event)
     {
        
        if(event.target.dataset.id=='cinfo')
        {
            this.cinfo=true;
            this.pinfo=false;
        }
        if(event.target.dataset.id=='pinfo')
        {
            this.pinfo=true;
            this.cinfo=false;
        }

     }
     toggleStep4(event)
     {
         // eslint-disable-next-line no-console
         //console.log("data"+event.target.dataset.id);
this.show=event.target.dataset.id;

//console.log("out"+this.show);
if(this.show=="step-2")
{
    
 

if(this.country&&this.region&&this.smanager&&this.customer&&this.sgroup&&this.signQuote&&this.porder1&&this.pnumber&&this.taxex)
{
    console.log("inside"+this.show);
    this.cinfo=false;
this.pinfo=true;
}
else{
    this.show="step-1";

    const evt = new ShowToastEvent({
        title: 'Application Error',
        message: 'Few required fields are missing',
        variant: 'error',
        mode: 'pester'
    });
this.dispatchEvent(evt);
}
}
     }


}