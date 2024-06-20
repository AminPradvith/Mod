import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsDynamicUiController.getPickList';
import insertRecommendations from '@salesforce/apex/UnlimitedRowsDynamicUiController.insertRecommendations';

export default class UnlimitedRowsDynamicUi5 extends LightningElement {

    @track listOfRecommendations = [];
    @api recordId = 'a1ODh000002Qf7yMAC';
    @api objectType = '';//Hydrafacial__c//IPL__c

    @track MicroNeedlingTable = false;
    @track TattooRemovalTable = false;
    @track TruSculptTable = false;
    @track VanquishTable = false;
    @track WeightLossTable = false;
    @track isSaveDisabled = true;



    @track MicroNeedlingNameList = ['Areas_treated__c', 'Topical_anesthesia__c'];
    @track Areas_treated__cValues = '';
    @track Topical_anesthesia__cValues = '';


    @track TattooRemovalNameList = ['Frosting_present__c'];
    @track Frosting_present__cValues = '';


    @track TruSculptNameList = ['Body_area__c', 'Tx_time__c'];
    @track Body_area__cValues = '';
    @track Tx_time__c = '';


    @track VanquishNameList = ['Body_area__c', 'Tx_time__c'];
    @track Body_area__cValues = '';
    @track Tx_time__c = '';


    @track WeightLossNameList = ['Medicine__c', 'Dosage__c', 'Area_injected__c',]
    @track Medicine__cValues = '';
    @track Dosage__cValues = '';
    @track Area_injected__c = '';


    connectedCallback() {
        if (this.objectType == "SkinPen_Microneedling_S__c") {
            this.MicroNeedlingTable = true;
            this.TattooRemovalTable = false;
            this.TruSculptTable = false;
            this.VanquishTable = false;
            this.WeightLossTable = false;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.MicroNeedlingNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Areas_treated__c) {
                        console.log('runing data');
                        this.Areas_treated__cValues = data.Areas_treated__c;
                        console.log('Areas_treated__cValues: ' + this.Areas_treated__cValues);
                    }

                    if (data && data.Topical_anesthesia__c) {
                        console.log('runing data');
                        this.Topical_anesthesia__cValues = data.Topical_anesthesia__c;
                        console.log('Topical_anesthesia__cValues: ' + this.Topical_anesthesia__cValues);
                    }



                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }

        else if (this.objectType == "Tattoo_Removal_S__c") {
            this.MicroNeedlingTable = false;
            this.TattooRemovalTable = true;
            this.TruSculptTable = false;
            this.VanquishTable = false;
            this.WeightLossTable = false;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.TattooRemovalNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Frosting_present__c) {
                        console.log('runing data');
                        this.Frosting_present__cValues = data.Frosting_present__c;
                        console.log('Frosting_present__cValues: ' + this.Frosting_present__cValues);
                    }


                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }
        else if (this.objectType == "TruSculpt_S__c") {
            this.TruSculptTable = true; 
            getPicklistValues({ objApi: this.objectType, fieldApis: this.TruSculptNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Body_area__c) {
                        console.log('runing data');
                        this.Body_area__cValues = data.Body_area__c;
                        console.log('Body_area__cValues: ' + this.Body_area__cValues);
                    }
                    if (data && data.Tx_time__c) {
                        console.log('runing data');
                        this.Tx_time__cValues = data.Tx_time__c;
                        console.log('Tx_time__cValues: ' + this.Tx_time__cValues);
                    }

                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }

        else if (this.objectType == "Vanquish_S__c") {
            this.VanquishTable = true;
           
            getPicklistValues({ objApi: this.objectType, fieldApis: this.VanquishNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Body_area__c) {
                        console.log('runing data');
                        this.Body_area__cValues = data.Body_area__c;
                        console.log('Body_area__cValues: ' + this.Body_area__cValues);
                    }
                    if (data && data.Tx_time__c) {
                        console.log('runing data');
                        this.Tx_time__cValues = data.Tx_time__c;
                        console.log('Tx_time__cValues: ' + this.Tx_time__cValues);
                    }

                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }


        else if (this.objectType == "Weight_Loss_S__c") {
            this.WeightLossTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.WeightLossNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Medicine__c) {
                        console.log('runing data');
                        this.Medicine__cValues = data.Medicine__c;
                        console.log('Medicine__cValues: ' + this.Medicine__cValues);
                    }
                    if (data && data.Dosage__c) {
                        console.log('runing data');
                        this.Dosage__cValues = data.Dosage__c;
                        console.log('Dosage__cValues: ' + this.Dosage__cValues);
                    }
                    if (data && data.Area_injected__c) {
                        console.log('runing data');
                        this.Area_injected__cValues = data.Area_injected__c;
                        console.log('Area_injected__cValues: ' + this.Area_injected__cValues);
                    }



                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }




    }
    initData() {
        let listOfRecommendations = [];
        this.createRow(listOfRecommendations);
        this.listOfRecommendations = listOfRecommendations;
        console.log("list of accounts init :" + JSON.stringify(this.listOfRecommendations));
    }

    createRow(listOfRecommendations) {
        let accountObject = {
            index: listOfRecommendations.length > 0 ? listOfRecommendations[listOfRecommendations.length - 1].index + 1 : 1,
            //Fractional Laser

            Areas_treated__cValues: '',
            Areas_treated__c: false,
            Areas_treated__cValuesList: [],
            tx__c: '',
            Topical_anesthesia__cValues: '',
            Topical_anesthesia__c: false,
            Topical_anesthesia__cValuesList: [],
            Number_of_passe__c: '',
            Procedure_depth__c: '',
            Notes__c: '',


            Areas__c: '',
            Treatment__c: '',
            wavelength__c: '',
            Spot_size_mm__c: '',
            Energy__c: '',
            Rep_rate_hz__c: '',
            Frosting_present__cValues: '',
            Frosting_present__c: false,
            Frosting_present__cValuesList: [],
            Occlusive_balm__c: false,
            Notes__c: '',


            Date__c: '',
            Hydration_level__c: '',
            Body_area__cValues: '',
            Body_area__c: false,
            Body_area__cValuesList: [],
            Tx_time__cValues: '',
            Tx_time__c: false,
            Tx_time__cValuesList: [],
            Employee_hook_up_initials__c: '',
            Power_used__c: '',
            Employee_mid_point_initials__c: '',
            Notes__c: '',
            Employee_removal_initials__c: '',
            Average_tuning__c: '',



            Date__c: '',
            Hydration_level__c: '',
            Body_area__cValues: '',
            Body_area__c: false,
            Body_area__cValuesList: [],
            Tx_time__cValues: '',
            Tx_time__c: false,
            Tx_time__cValuesList: [],
            Hook_up_initials__c: '',
            Power_used__c: '',
            Employee_mid_point_initials__c: '',
            Notes__c: '',
            Employee_removal_initials__c: '',
            Average_tuning__c: '',




            Weight_Loss_week__c:'',
            Starting_weight__c:'',
            Last_week_weight__c:'',
            Todays_weight__c:'',
            Height__c:'',
            bmi__c:'',
            Starting_muscle_mass__c:'',
            Todays_muscle_mass__c:'',
            Medicine__cValues: '',
            Medicine__c: false,
            Medicine__cValuesList: [],
            Dosage__cValues: '',
            Dosage__c: false,
            Dosage__cValuesList: [],
            Lot__c:'',
            Expiration__c:'',
            Area_injected__cValues: '',
            Area_injected__c: false,
            Area_injected__cValuesList: [],
            b12_given__c:false,
            Zofran_prescribed__c:false,
            Notes__c:''




        };
        listOfRecommendations.push(accountObject);
        console.log("list of accounts createRow :" + JSON.stringify(this.listOfRecommendations));
    }

    addNewRow() {
        this.createRow(this.listOfRecommendations);
    }

    removeRow(event) {
        let toBeDeletedRowIndex = parseInt(event.target.name);
        let listOfRecommendations = this.listOfRecommendations.filter(account => account.index !== toBeDeletedRowIndex);
        this.listOfRecommendations = listOfRecommendations.map((account, idx) => ({ ...account, index: idx + 1 }));
        console.log("list of accounts removeRow :" + JSON.stringify(this.listOfRecommendations));
    }
    ///Universal Picklist input Function
    handleInputClick(event) {
        console.log('handleInputClick running');
        let index = parseInt(event.target.dataset.id);
        let fieldName = event.target.name;


        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, [fieldName]: !account[fieldName] };
            }
            return account;
        });
    }
    NeedlingAreasSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Areas_treated__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Areas_treated__cValuesList: selectedMembershipValArray,
                    Areas_treated__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    NeedingAreasPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Areas_treated__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Areas_treated__cValues: selectedMembershipValArray.join(';'),
                    Areas_treated__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputNeedlingTx(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, tx__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleTopicalAnesthesiaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Topical_anesthesia__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Topical_anesthesia__cValuesList: selectedMembershipValArray,
                    Topical_anesthesia__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    handleTopicalAnesthesiaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Topical_anesthesia__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Topical_anesthesia__cValues: selectedMembershipValArray.join(';'),
                    Topical_anesthesia__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputNumberofPasse(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Number_of_passe__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputProcedureDepth(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Procedure_depth__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputNeedlingNotes(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    handleInputTattooArea(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Areas: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputTattooTreatment(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Treatment__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputTattoowavelength(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, wavelength__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    handleInputTattooSpot_size_mm(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Spot_size_mm__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputTattooEnergy(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Energy__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputTattooRep_rate_hz(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Rep_rate_hz__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    HandleTattooRemovalFrosting_presentsSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Frosting_present__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Frosting_present__cValuesList: selectedMembershipValArray,
                    Frosting_present__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleTattoRemovalFrosting_presentPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Frosting_present__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Frosting_present__cValues: selectedMembershipValArray.join(';'),
                    Frosting_present__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    HandleOcclusive_balm(event) {
        console.log('This event is working');
        let index = parseInt(event.target.dataset.id);
        console.log('index==>', index);
        let newValue = event.target.value;
        console.log('newValue==>', newValue);

        let checkValue = event.target.checked;
        console.log('checkValue==>', checkValue);

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Occlusive_balm__c: checkValue };
            }
            return account;
        });
        this.isSaveDisabled = false;


    }


    handleTattooNotes(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleTruSculptDateChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Date__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputHydration_level(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydration_level__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HandleTruSculptBody_areaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Body_area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Body_area__cValuesList: selectedMembershipValArray,
                    Body_area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleBody_area__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Body_area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Body_area__cValues: selectedMembershipValArray.join(';'),
                    Body_area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HandleTx_time__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Tx_time__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Tx_time__cValuesList: selectedMembershipValArray,
                    Tx_time__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleTx_timePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Tx_time__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Tx_time__cValues: selectedMembershipValArray.join(';'),
                    Tx_time__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleEmployee_hook_up_initialsSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Employee_hook_up_initials__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputPower_usedSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Power_used__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    handleInputEmployee_mid_point_initials(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Employee_mid_point_initials__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputNotesSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleEmployee_removal_initials(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Employee_removal_initials__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleAverage_tuning(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Average_tuning__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }













    handleVanquishDateChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Date__c: newValue };
            }
            return account;

        });
        this.isSaveDisabled = false;


    }



    handleInputVanquishHydration_level(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydration_level__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HandleVanquishBody_areaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Body_area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Body_area__cValuesList: selectedMembershipValArray,
                    Body_area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleVanquishBody_areaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Body_area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Body_area__cValues: selectedMembershipValArray.join(';'),
                    Body_area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HandleVanquishTx_timeSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Tx_time__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Tx_time__cValuesList: selectedMembershipValArray,
                    Tx_time__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleVanquishTx_timePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Tx_time__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Tx_time__cValues: selectedMembershipValArray.join(';'),
                    Tx_time__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleVanquishhook_up_initialsSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hook_up_initials__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputVanquishPower_usedSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Power_used__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    handleInputVanquishEmployee_mid_point_initials(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Employee_mid_point_initials__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputVanquishNotesSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleVanquishEmployee_removal_initials(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Employee_removal_initials__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleVanquishAverage_tuning(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Average_tuning__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputTWeight_Loss_week(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Weight_Loss_week__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputStarting_weight(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Starting_weight__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputLast_week_weight(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Last_week_weight__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputTodays_weight(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Todays_weight__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputHeight(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Height__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputbmi(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, bmi__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputStarting_muscle_mass(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Starting_muscle_mass__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputTodays_muscle_mass(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Todays_muscle_mass__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    HandleMedicinesSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Medicine__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Medicine__cValuesList: selectedMembershipValArray,
                    Medicine__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleMedicinePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Medicine__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Medicine__cValues: selectedMembershipValArray.join(';'),
                    Medicine__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    HandleDosagesSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Dosage__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Dosage__cValuesList: selectedMembershipValArray,
                    Dosage__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleDosagePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Dosage__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Dosage__cValues: selectedMembershipValArray.join(';'),
                    Dosage__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputWeightLossLot(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Lot__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputExpiration(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Expiration__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    HandleArea_injectedSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Area_injected__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Area_injected__cValuesList: selectedMembershipValArray,
                    Area_injected__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleArea_injectedPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Area_injected__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Area_injected__cValues: selectedMembershipValArray.join(';'),
                    Area_injected__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    Handleb12_given(event) {
        console.log('This event is working');
        let index = parseInt(event.target.dataset.id);
        console.log('index==>', index);
        let newValue = event.target.value;
        console.log('newValue==>', newValue);

        let checkValue = event.target.checked;
        console.log('checkValue==>', checkValue);

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, b12_given__c: checkValue };
            }
            return account;
        });
        this.isSaveDisabled = false;


    }

    HandleZofran_prescribed(event) {
        console.log('This event is working');
        let index = parseInt(event.target.dataset.id);
        console.log('index==>', index);
        let newValue = event.target.value;
        console.log('newValue==>', newValue);

        let checkValue = event.target.checked;
        console.log('checkValue==>', checkValue);

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Zofran_prescribed__c: checkValue };
            }
            return account;
        });
        this.isSaveDisabled = false;


    }


    handleWeightLossNotes(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }















    createRecommendations() {
        if (this.MicroNeedlingTable == true) {
            let isValidationFailed = false;
            for (let i = 0; i < this.listOfRecommendations.length; i++) {
             
            }
           
            if (!isValidationFailed) {
                insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                    .then(async (data) => {
                        this.initData();
                        this.template.querySelector('c-custom-Toast').showToast('success', 'SkinPen Microneedling saved successfully.', 'utility:success', 10000);
                    })

                    .catch(error => {
                        this.ShowSpinner = false;
                        this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                    });
            }
        }

        else if (this.TattooRemovalTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Tattoo Removal saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.TruSculptTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'TruSculpt saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.VanquishTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Vanquish saved successfully.', 'utility:success', 10000);
                    this.initData();
                    this.resetInputFields();
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.WeightLossTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Weight Loss saved successfully.', 'utility:success', 10000);
                    this.initData();
                    this.resetInputFields();
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }




        this.initData();
    }
    resetInputFields() {
        // Select all input fields with the specific class
        const inputFields = this.template.querySelectorAll('.vanquish-date-input');
        inputFields.forEach(field => {
            field.value = '';
        });
    }

    handleKeydown(event) {
        const invalidKeyCodes = [
            ...Array(26).fill(65).map((code, idx) => code + idx), // A-Z
            ...Array(26).fill(97).map((code, idx) => code + idx), // a-z
            ...Array(10).fill(48).map((code, idx) => code + idx), // 0-9
            ...Array(10).fill(96).map((code, idx) => code + idx), // Numpad 0-9
            32, // Space
            189, // Dash
            187, // Equals
            188, // Comma
            190, // Period
            191, // Slash
            192, // Backtick
            219, // Open bracket
            220, // Backslash
            221, // Close bracket
            222,  // Single quote
            186, // Semicolon and colon (;:)
            46,//delete
            8 //backspace
        ];

        if (invalidKeyCodes.includes(event.keyCode)) {
            event.preventDefault();
        }
    }

}