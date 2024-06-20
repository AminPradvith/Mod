public class UnlimitedRowsDynamicUiController {
    
    @AuraEnabled
    public static string insertRecommendations(List<Map<String, Object>> jsonOfListOfRecommendations) {
        System.debug(JSON.serialize(jsonOfListOfRecommendations));
        System.debug(jsonOfListOfRecommendations.size());
        List<Recommendations_for_Aesthetic_consult__c> ACrToInsert = new List<Recommendations_for_Aesthetic_consult__c>();
        list<Consult_Hair_Restoration__c> HRCList = new list<Consult_Hair_Restoration__c>();
        list<Tattoo_Removal_Consult_S__c> TRCList = new list<Tattoo_Removal_Consult_S__c>();
        list<Botox_Dysport_S__c	> BDList = new list<Botox_Dysport_S__c	>();
        list<Dermal_Filler_S__c	> DFList = new list<Dermal_Filler_S__c	>();
        List<Emsculpt_S__c> EmList = new list <Emsculpt_S__c>(); 
        List<Facial_S__c	> FcList = new list<Facial_S__c	>();
        List<Fractional_Laser_S__c> FlList = new List<Fractional_Laser_S__c>();
        List<Hydrafacial_S__c> HfList = new list<Hydrafacial_S__c>();
        List<IPL_S__c> IPLList = new list<IPL_S__c>();
        List<Kybella_S__c> kyList = new list<Kybella_S__c>();
        List<Laser_Hair_Removal_S__c> HlList = new list<Laser_Hair_Removal_S__c>();
        List<Laser_Vein_Removal_S__c> LvList = new list <Laser_Vein_Removal_S__c>();
        List<Microdermabrasion_S__c> mdmList = new list<Microdermabrasion_S__c>();
        List<Peel_S__c> peelList = new list<Peel_S__c>();
        List <Sculptra_Body_S__c> SbList = new list<Sculptra_Body_S__c>(); 
        List<SkinPen_Microneedling_S__c> SmList = new List<SkinPen_Microneedling_S__c>(); 
        list<Tattoo_Removal_S__c> TrList = new list<Tattoo_Removal_S__c>();
        List<TruSculpt_S__c> TrsList = new list<TruSculpt_S__c>();
        List<Vanquish_S__c> VqList = new list<Vanquish_S__c>();
        List<Weight_Loss_S__c> WlList = new list<Weight_Loss_S__c>();

        for (Map<String, Object> m : jsonOfListOfRecommendations) {
            Recommendations_for_Aesthetic_consult__c ACR = new Recommendations_for_Aesthetic_consult__c();
            Consult_Hair_Restoration__c hrc = new Consult_Hair_Restoration__c();
            Tattoo_Removal_Consult_S__c	 TRC = new Tattoo_Removal_Consult_S__c	();
            Botox_Dysport_S__c	 BD = new Botox_Dysport_S__c();
            Dermal_Filler_S__c	 DF = new Dermal_Filler_S__c	(); 
            Emsculpt_S__c Em = new Emsculpt_S__c();
            Facial_S__c	 Fc = new Facial_S__c	();
            Fractional_Laser_S__c Fl = new Fractional_Laser_S__c();
            Hydrafacial_S__c Hf = new Hydrafacial_S__c();
            IPL_S__c IPLS = new IPL_S__c();
            Kybella_S__c ky = new Kybella_S__c();
            Laser_Hair_Removal_S__c Hl = new Laser_Hair_Removal_S__c();
            Laser_Vein_Removal_S__c Lv = new Laser_Vein_Removal_S__c();
            Microdermabrasion_S__c mdm = new Microdermabrasion_S__c();
            Peel_S__c peels = new Peel_S__c();
            Sculptra_Body_S__c Sb = new Sculptra_Body_S__c();
            SkinPen_Microneedling_S__c Sm = new SkinPen_Microneedling_S__c();
            Tattoo_Removal_S__c Tr = new Tattoo_Removal_S__c();
            TruSculpt_S__c trs = new TruSculpt_S__c();
            Vanquish_S__c vq = new Vanquish_S__c();
            Weight_Loss_S__c Wl = new Weight_Loss_S__c();
            if (m.containsKey('MembershipValuesList')) {
                List<object> membershipValuesList = (List<object>)m.get('MembershipValuesList');
                if(!membershipValuesList.isEmpty()){
                    String joinedMembershipValues = String.join(membershipValuesList, ';');
                    ACR.Aesthetic_consult_Membership__c = joinedMembershipValues;
                }
            }
            if (m.containsKey('ProductValuesList')) {
                List<object> productValuesList = (List<object>)m.get('ProductValuesList');
                if(!ProductValuesList.isEmpty()){
                    String joinedProductValues = String.join(productValuesList, ';');
                    ACR.Aesthetic_consult_Products__c = joinedProductValues;
                }
            }
            if (m.containsKey('TreatmentValuesList')) {
                List<object> productValuesList = (List<object>)m.get('TreatmentValuesList');
                if(!productValuesList.isEmpty()){
                    String joinedProductValues = String.join(productValuesList, ';');
                    ACR.Aesthetic_consult_Treatments__c = joinedProductValues;
                }
            }   
            if (m.containsKey('AreaValuesList')) {
                List<object> productValuesList = (List<object>)m.get('AreaValuesList');
                if(!productValuesList.isEmpty()){
                    String joinedProductValues = String.join(productValuesList, ';');
                    ACR.Aesthetic_consult_Area__c = joinedProductValues;
                }
            }            
            if (m.containsKey('Units_Syringe')) {
                String unitsSyringe = (String)m.get('Units_Syringe');
                if(unitsSyringe!= null){
                    ACR.Aesthetic_consult_units_syrings__c = (string)m.get('Units_Syringe');
                }
            }   
            if (m.containsKey('comments')) {
                String unitsSyringe = (String)m.get('comments');
                if(unitsSyringe != null){
                    ACR.Aesthetic_consult_Comments__c = (string)m.get('comments');
                }
            }   
            ACrToInsert.add(ACR);
            if (m.containsKey('HPI_Date__c')) {
                String dateString2 = (String)m.get('HPI_Date__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    hrc.HPI_Date__c = Date.newInstance(year, month, day);
                    System.debug('HPI_Date__c ' + hrc.HPI_Date__c);
                }
            }
            if(m.containsKey('HPI_FUT_vs_FUE__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('HPI_FUT_vs_FUE__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                hrc.HPI_FUT_vs_FUE__c = joinedProductValues;
            }
            if (m.containsKey('HPI_No_of_Grafts__c')) {
                String grafts = (String)m.get('HPI_No_of_Grafts__c');
                if (grafts != null) {
                    hrc.HPI_No_of_Grafts__c = grafts;
                }
            }
            if (m.containsKey('HPI_Year__c')) {
                String years = (String)m.get('HPI_Year__c');
                if (years != null) {
                    hrc.HPI_Year__c = years;
                }
            }
            if (m.containsKey('HPI_Surgeon__c')) {
                String Surgeon = (String)m.get('HPI_Surgeon__c');
                if (Surgeon != null) {
                    hrc.HPI_Surgeon__c = Surgeon;
                }
            }
            HRCList.add(hrc);
            if(m.containsKey('Tattoo_Removal_Skin_Type__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Skin_Type__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Skin_Type__c = joinedProductValues;
            }
            if(m.containsKey('Tattoo_Removal_Location__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Location__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Location__c = joinedProductValues;
            }
            if(m.containsKey('Tattoo_Removal_Amount_of_Ink__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Amount_of_Ink__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Amount_of_Ink__c = joinedProductValues;
            }
            if(m.containsKey('Tattoo_Removal_Ink_Layering__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Ink_Layering__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Ink_Layering__c = joinedProductValues;
            }
            if(m.containsKey('Tattoo_Removal_Scarring_Tissue_Change__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Scarring_Tissue_Change__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Scarring_Tissue_Change__c = joinedProductValues;
            }
            if(m.containsKey('Tattoo_Removal_Colors__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Colors__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Colors__c = joinedProductValues;
            }
            if (m.containsKey('Tattoo_Removal_Kirby_Score__c')) {
                String Kirby = (String)m.get('Tattoo_Removal_Kirby_Score__c');
                if (Kirby != null) {
                    TRC.Tattoo_Removal_Kirby_Score__c = Kirby;
                }
            }
            if(m.containsKey('Tattoo_Removal_Tattoo_Type__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Tattoo_Type__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Tattoo_Type__c = joinedProductValues;
            }
            if(m.containsKey('Tattoo_Removal_Age__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Age__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Age__c= joinedProductValues;
            }
            if(m.containsKey('Tattoo_Removal_Size__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tattoo_Removal_Size__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                TRC.Tattoo_Removal_Size__c= joinedProductValues;
            }
            if (m.containsKey('Tattoo_Removal_Notes__c')) {
                String Notes = (String)m.get('Tattoo_Removal_Notes__c');
                if (Notes != null) {
                    TRC.Tattoo_Removal_Notes__c = Notes;
                }
            }
            TRCList.add(TRC);
            if(m.containsKey('Botox_Dysport_Injectable_Procedure_Area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Botox_Dysport_Injectable_Procedure_Area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                BD.Botox_Dysport_Injectable_Procedure_Area__c = joinedProductValues;
            }
            if (m.containsKey('Botox_Dysport_Procedure_Injectable__cValuesList')) {
                List<object> productValuesList = (List<object>)m.get('Botox_Dysport_Procedure_Injectable__cValuesList');
                if(!ProductValuesList.isEmpty()){
                    String joinedProductValues = String.join(productValuesList, ';');
                    BD.Botox_Dysport_Procedure_Injectable__c = joinedProductValues;
                }
            }
            if (m.containsKey('Botox_Dysport_Procedure_Units_Syringes__c')) {
                String UnitsSyringes = (String)m.get('Botox_Dysport_Procedure_Units_Syringes__c');
                if (UnitsSyringes != null) {
                    BD.Botox_Dysport_Procedure_Units_Syringes__c = UnitsSyringes;
                }
            }
            if (m.containsKey('Botox_Dysport_Procedure_Reconstituted__cValuesList')) {
                List<object> productValuesList = (List<object>)m.get('Botox_Dysport_Procedure_Reconstituted__cValuesList');
                if(!ProductValuesList.isEmpty()){
                    String joinedProductValues = String.join(productValuesList, ';');
                    BD.Botox_Dysport_Procedure_Reconstituted__c = joinedProductValues;
                }
            }
            if (m.containsKey('Botox_Dysport_Procedure_Lot__c')) {
                String Lot = (String)m.get('Botox_Dysport_Procedure_Lot__c');
                if (Lot != null) {
                    BD.Botox_Dysport_Procedure_Lot__c = Lot;
                }
            }
            if (m.containsKey('Botox_Dysport_Procedure_Expiration__c')) {
                String Expiration = (String)m.get('Botox_Dysport_Procedure_Expiration__c');
                if (Expiration != null) {
                    BD.Botox_Dysport_Procedure_Expiration__c = Expiration;
                }
            }
            BDList.add(Bd);
            // Botox End///
            if(m.containsKey('Dermal_Filler_Procedure_Area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Dermal_Filler_Procedure_Area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                DF.Dermal_Filler_Procedure_Area__c = joinedProductValues;
            }
            if (m.containsKey('Dermal_Filler_Procedure_Injectable__cValuesList')) {
                List<object> productValuesList = (List<object>)m.get('Dermal_Filler_Procedure_Injectable__cValuesList');
                if(!ProductValuesList.isEmpty()){
                    String joinedProductValues = String.join(productValuesList, ';');
                    DF.Dermal_Filler_Procedure_Injectable__c = joinedProductValues;
                }
            }
            if (m.containsKey('Dermal_Filler_Procedure_Units_Syringes__c')) {
                String UnitsSyringes = (String)m.get('Dermal_Filler_Procedure_Units_Syringes__c');
                if (UnitsSyringes != null) {
                    DF.Dermal_Filler_Procedure_Units_Syringes__c = UnitsSyringes;
                }
            }
            if (m.containsKey('Dermal_Filler_Procedure_Reconstituted__cValuesList')) {
                List<object> productValuesList = (List<object>)m.get('Dermal_Filler_Procedure_Reconstituted__cValuesList');
                if(!ProductValuesList.isEmpty()){
                    String joinedProductValues = String.join(productValuesList, ';');
                    DF.Dermal_Filler_Procedure_Reconstituted__c = joinedProductValues;
                }
            }
            if (m.containsKey('Dermal_Filler_Procedure_Lot__c')) {
                String Lot = (String)m.get('Dermal_Filler_Procedure_Lot__c');
                if (Lot != null) {
                    DF.Dermal_Filler_Procedure_Lot__c = Lot;
                }
            }
            if (m.containsKey('Dermal_Filler_Procedure_Expiration__c')) {
                String Expiration = (String)m.get('Dermal_Filler_Procedure_Expiration__c');
                if (Expiration != null) {
                    DF.Dermal_Filler_Procedure_Expiration__c = Expiration;
                }
            }
            DFList.add(DF);
            if (m.containsKey('Emsculpt_date__c')) {
                String dateString2 = (String)m.get('Emsculpt_date__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    Em.Emsculpt_date__c = Date.newInstance(year, month, day);
                    System.debug('Emsculpt_date__c ' + Em.Emsculpt_date__c);
                }
            }
            if(m.containsKey('Emsculpt_body_area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Emsculpt_body_area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Em.Emsculpt_body_area__c = joinedProductValues;
            }
            if(m.containsKey('Emsculpt_Tx_Time__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Emsculpt_Tx_Time__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Em.Emsculpt_Tx_Time__c = joinedProductValues;
            }
            if (m.containsKey('Emsculpt_Power_Used__c')) {
                String PowerUsed = (String)m.get('Emsculpt_Power_Used__c');
                if (PowerUsed != null) {
                    Em.Emsculpt_Power_Used__c = PowerUsed;
                }
            }
            if (m.containsKey('Emsculpt_Notes__c')) {
                String Notes = (String)m.get('Emsculpt_Notes__c');
                if (Notes != null) {
                    Em.Emsculpt_Notes__c = Notes;
                }
            }
            EmList.add(Em);
            if(m.containsKey('Facial_Type__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Facial_Type__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fc.Facial_Type__c = joinedProductValues;
            }
            if(m.containsKey('Facial_Location__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Facial_Location__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fc.Facial_Location__c = joinedProductValues;
            }
            if (m.containsKey('Facial_Cleanser__c')) {
                String Cleanser = (String)m.get('Facial_Cleanser__c');
                if (Cleanser != null) {
                    Fc.Facial_Cleanser__c = Cleanser;
                }
            }
            if (m.containsKey('Facial_Toner__c')) {
                String Toner = (String)m.get('Facial_Toner__c');
                if (Toner != null) {
                    Fc.Facial_Toner__c = Toner;
                }
            }
            if (m.containsKey('Facial_Steam__c')) {
                boolean Steam = (boolean)m.get('Facial_Steam__c');
                System.debug('stream==>'+Steam);
                if (Steam != null) {
                    Fc.Facial_Steam__c = boolean.valueOf(Steam);
                    System.debug('Facial_Steam__c==>'+Fc.Facial_Steam__c);
                }
            }
            if (m.containsKey('Facial_Extractions__c')) {
                boolean Extraction = (boolean)m.get('Facial_Extractions__c');
                System.debug('stream==>'+Extraction);
                if (Extraction != null) {
                    Fc.Facial_Extractions__c = Boolean.valueOf(Extraction);
                    System.debug('Facial_Extractions__c==>'+Fc.Facial_Extractions__c);
                }
            }
            if (m.containsKey('Facial_Mask__c')) {
                String Mask = (String)m.get('Facial_Mask__c');
                if (Mask != null) {
                    Fc.Facial_Mask__c = Mask;
                }
            }
            if (m.containsKey('Facial_Moisturizer__c')) {
                String Moisturizer = (String)m.get('Facial_Moisturizer__c');
                if (Moisturizer != null) {
                    Fc.Facial_Moisturizer__c = Moisturizer;
                }
            }
            if (m.containsKey('Facial_Notes__c')) {
                String Notes = (String)m.get('Facial_Notes__c');
                if (Notes != null) {
                    Fc.Facial_Notes__c = Notes;
                }
            }
            FcList.add(Fc);
            if (m.containsKey('Fractional_Laser_Tx__c')) {
                String Tx = (String)m.get('Fractional_Laser_Tx__c');
                if (Tx != null) {
                    Fl.Fractional_Laser_Tx__c = Tx;
                }
            }
            if(m.containsKey('Fractional_Laser_area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Fractional_Laser_area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fl.Fractional_Laser_area__c = joinedProductValues;
            }
            if(m.containsKey('Fractional_Laser_tip__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Fractional_Laser_tip__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fl.Fractional_Laser_tip__c = joinedProductValues;
            }
            if(m.containsKey('Fractional_Laser_joules__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Fractional_Laser_joules__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fl.Fractional_Laser_joules__c = joinedProductValues;
            }
            if(m.containsKey('Fractional_Laser_pulses_ms__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Fractional_Laser_pulses_ms__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fl.Fractional_Laser_pulses_ms__c = joinedProductValues;
            }
            if(m.containsKey('Fractional_Laser_ice_roller_applied__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Fractional_Laser_ice_roller_applied__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fl.Fractional_Laser_ice_roller_applied__c = joinedProductValues;
            }
            if(m.containsKey('Fractional_Laser_HA_serum_applied__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Fractional_Laser_HA_serum_applied__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fl.Fractional_Laser_HA_serum_applied__c = joinedProductValues;
            }
            if (m.containsKey('Fractional_Laser_notes__c')) {
                String Notes = (String)m.get('Fractional_Laser_notes__c');
                if (Notes != null) {
                    Fl.Fractional_Laser_notes__c = Notes;
                }
            }
            if(m.containsKey('Fractional_Laser_passes_completed__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Fractional_Laser_passes_completed__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Fl.Fractional_Laser_passes_completed__c = joinedProductValues;
            }
            FlList.add(Fl);
            if(m.containsKey('Hydrafacial_Location__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Hydrafacial_Location__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Hf.Hydrafacial_Location__c = joinedProductValues;
            }
            if (m.containsKey('Hydrafacial_Cleanser__c')) {
                String Cleanser = (String)m.get('Hydrafacial_Cleanser__c');
                if (Cleanser != null) {
                    Hf.Hydrafacial_Cleanser__c = Cleanser;
                }
            }
            if (m.containsKey('Hydrafacial_Peel__c')) {
                String Peel = (String)m.get('Hydrafacial_Peel__c');
                if (peel != null) {
                    Hf.Hydrafacial_Peel__c = Peel;
                }
            }
            if (m.containsKey('Hydrafacial_Extractions__c')) {
                Boolean Extraction = (Boolean)m.get('Hydrafacial_Extractions__c');
                System.debug('stream==>' + Extraction);
                if (Extraction != null) {
                    HF.Hydrafacial_Extractions__c = Extraction;
                    System.debug('Hydrafacial_Extractions__c==>' + HF.Hydrafacial_Extractions__c);
                }
            }
            if (m.containsKey('Hydrafacial_Serum__c')) {
                String serum = (String)m.get('Hydrafacial_Serum__c');
                if (serum != null) {
                    Hf.Hydrafacial_Serum__c = serum;
                }
            }
            if (m.containsKey('Hydrafacial_Booster__c')) {
                String Booster = (String)m.get('Hydrafacial_Booster__c');
                if (Booster != null) {
                    Hf.Hydrafacial_Booster__c = Booster;
                }
            }
            if (m.containsKey('Hydrafacial_Moisturizer__c')) {
                String Moisturizer = (String)m.get('Hydrafacial_Moisturizer__c');
                if (Moisturizer != null) {
                    Hf.Hydrafacial_Moisturizer__c = Moisturizer;
                }
            }
            if (m.containsKey('Hydrafacial_Notes__c')) {
                String Notes = (String)m.get('Hydrafacial_Notes__c');
                if (Notes != null) {
                    Hf.Hydrafacial_Notes__c = Notes;
                }
            }          
            HfList.add(Hf);
            if(m.containsKey('IPL_Tx__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('IPL_Tx__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                IPLs.IPL_Tx__c = joinedProductValues;
            }
            if(m.containsKey('IPL_Tx__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('IPL_Tx__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                IPLs.IPL_Tx__c = joinedProductValues;
            }
            if(m.containsKey('Area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                IPLs.Area__c = joinedProductValues;
            }
            if(m.containsKey('Handpiece__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Handpiece__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                IPLs.Handpiece__c = joinedProductValues;
            }
            if (m.containsKey('IPL_skinTel__c')) {
                String Skintel = (String)m.get('IPL_skinTel__c');
                if (SkinTel != null) {
                    IPLs.IPL_skinTel__c = SkinTel;
                }
            } 
            if (m.containsKey('Baseline_Skintel__c')) {
                String BaseLineSkintel = (String)m.get('Baseline_Skintel__c');
                if (BaseLineSkinTel != null) {
                    IPLs.Baseline_Skintel__c = BaselineSkinTel;
                }
            }       
            if (m.containsKey('Joules__c')) {
                String Joules = (String)m.get('Joules__c');
                if (Joules != null) {
                    IPLs.Joules__c = Joules;
                }
            } 
            if (m.containsKey('Pulse_width__c')) {
                String Pulse = (String)m.get('Pulse_width__c');
                if (Pulse != null) {
                    IPLs.Pulse_width__c = Pulse;
                }
            } 
            if (m.containsKey('Last_skintel__c')) {
                String LastSkintel = (String)m.get('Last_skintel__c');
                if (LastSkinTel != null) {
                    IPLs.Last_skintel__c = LastSkinTel;
                }
            } 
            if (m.containsKey('Notes__c')) {
                String IPLNotes = (String)m.get('Notes__c');
                if (IPLNotes != null) {
                    IPLs.Notes__c = IPLNotes;
                }
            } 
            if(m.containsKey('Sunscreen_applied__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Sunscreen_applied__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                IPLs.Sunscreen_applied__c = joinedProductValues;
            }
            IPLList.add(IPLs);
            if (m.containsKey('Number_Of_Injections__c')) {
                String Injections = (String)m.get('Number_Of_Injections__c');
                if (Injections != null) {
                    ky.Number_Of_Injections__c = Injections;
                }
            } 
            if (m.containsKey('Total_dosage__c')) {
                String dosage = (String)m.get('Total_dosage__c');
                if (dosage != null) {
                    ky.Total_dosage__c = dosage;
                }
            } 
            if (m.containsKey('Expiration_number__c')) {
                String Expiration = (String)m.get('Expiration_number__c');
                if (Expiration != null) {
                    ky.Expiration_number__c = Expiration;
                }
            } 
            if (m.containsKey('Lot_number__c')) {
                String Lot = (String)m.get('Lot_number__c');
                if (Lot != null) {
                    ky.Lot_number__c = Lot;
                }
            } 
            if (m.containsKey('Notes__c')) {
                String Notes = (String)m.get('Notes__c');
                if (Notes != null) {
                    ky.Notes__c = Notes;
                }
            } 
            kylist.add(Ky);
            if(m.containsKey('Laser_Hair_Removal_area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Laser_Hair_Removal_area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Hl.Laser_Hair_Removal_area__c = joinedProductValues;
            }
            if (m.containsKey('Notes__c')) {
                String Treatment = (String)m.get('Treatment__c');
                if (Treatment != null) {
                    Hl.Treatment__c = Treatment;
                }
            } 
            if(m.containsKey('Tip__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tip__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Hl.Tip__c = joinedProductValues;
            }
            if (m.containsKey('Joules__c')) {
                String Joules = (String)m.get('Joules__c');
                if (Joules != null) {
                    Hl.Joules__c = Joules;
                }
            } 
            if (m.containsKey('Pulse_width__c')) {
                String Pulse = (String)m.get('Pulse_width__c');
                if (Pulse != null) {
                    Hl.Pulse_width__c = Pulse;
                }
            } 
            if (m.containsKey('Passes__c')) {
                String Pases = (String)m.get('Passes__c');
                if (Pases != null) {
                    Hl.Passes__c = Pases;
                }
            } 
            if (m.containsKey('Skintel__c')) {
                String Skintel = (String)m.get('Skintel__c');
                if (Skintel != null) {
                    Hl.Skintel__c = Skintel;
                }
            } 
            if (m.containsKey('Baseline_Skintel__c')) {
                String Baseline = (String)m.get('Baseline_Skintel__c');
                if (Baseline != null) {
                    Hl.Baseline_Skintel__c = Baseline;
                }
            } 
            if (m.containsKey('Skin_type__c')) {
                String Skin = (String)m.get('Skin_type__c');
                if (Skin != null) {
                    Hl.Skin_type__c = Skin;
                }
            } 
            if (m.containsKey('Notes__c')) {
                String Notes = (String)m.get('Notes__c');
                if (Notes != null) {
                    Hl.Notes__c = Notes;
                }
            } 
            HlList.add(Hl);
            if(m.containsKey('Area__cValuesLists')){
                List<object> productValuesList = (List<object>)m.get('Area__cValuesLists');
                String joinedProductValues = String.join(productValuesList, ';');
                Lv.Area__c = joinedProductValues;
            }     
            if(m.containsKey('Spot_size__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Spot_size__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Lv.Spot_size__c = joinedProductValues;
            } 
            if (m.containsKey('ms__c')) {
                String ms = (String)m.get('ms__c');
                if (ms != null) {
                    Lv.ms__c = ms;
                }
            } 
            if (m.containsKey('Joules__c')) {
                String Joules = (String)m.get('Joules__c');
                if (Joules != null) {
                    Lv.Joules__c = Joules;
                }
            } 
            if (m.containsKey('Notes__c')) {
                String Notes = (String)m.get('Notes__c');
                if (Notes != null) {
                    Lv.Notes__c = Notes;
                }
            } 
            if(m.containsKey('Jelly_applied__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Jelly_applied__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Lv.Jelly_applied__c = joinedProductValues;
            }
            if (m.containsKey('Skintel__c')) {
                String Skintel = (String)m.get('Skintel__c');
                if (Skintel != null) {
                    Lv.Skintel__c = Skintel;
                }
            } 
            if (m.containsKey('Baseline_skintell__c')) {
                String Base = (String)m.get('Baseline_skintell__c');
                if (Base != null) {
                    Lv.Baseline_skintell__c = Base;
                }
            } 
            if(m.containsKey('Ice_roller_used__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Ice_roller_used__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Lv.Ice_roller_used__c = joinedProductValues;
            }     
            LvList.add(Lv);
            if(m.containsKey('Area__cValueList')){
                List<object> productValuesList = (List<object>)m.get('Area__cValueList');
                String joinedProductValues = String.join(productValuesList, ';');
                mdm.Area__c = joinedProductValues;
            }  
            if(m.containsKey('Zone__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Zone__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                mdm.Zone__c = joinedProductValues;
            } 
            if(m.containsKey('Pass__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Pass__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                mdm.Pass__c = joinedProductValues;
            } 
            if (m.containsKey('Vacuum_setting__c')) {
                String setting = (String)m.get('Vacuum_setting__c');
                if (setting != null) {
                    mdm.Vacuum_setting__c = setting;
                }
            } 
            if (m.containsKey('Wand__c')) {
                String wand = (String)m.get('Wand__c');
                if (wand != null) {
                    mdm.Wand__c = wand;
                }
            } 
            if (m.containsKey('Post_op__c')) {
                String post = (String)m.get('Post_op__c');
                if (post != null) {
                    mdm.Post_op__c = post;
                }
            } 
            if(m.containsKey('Effect__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Effect__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                mdm.Effect__c = joinedProductValues;
            }
            if(m.containsKey('Care__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Care__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                mdm.Care__c = joinedProductValues;
            }
            if(m.containsKey('Medications__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Medications__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                mdm.Medications__c = joinedProductValues;
            }
            if (m.containsKey('Notes__c')) {
                String Notes = (String)m.get('Notes__c');
                if (Notes != null) {
                    mdm.Notes__c = Notes;
                }
            } 
            mdmList.add(mdm);
            if (m.containsKey('Peel__c')) {
                String Peel = (String)m.get('Peel__c');
                if (Peel != null) {
                    Peels.Peel__c = peel;
                }
            } 
            if(m.containsKey('Location__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Location__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                peels.Location__c = joinedProductValues;
            }
            if(m.containsKey('Type__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Type__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                peels.Type__c = joinedProductValues;
            }
            if (m.containsKey('Duration__c')) {
                String Duration = (String)m.get('Duration__c');
                if (Duration != null) {
                    Peels.Duration__c = Duration;
                }
            } 
            if(m.containsKey('Cooling_method__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Cooling_method__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                peels.Cooling_method__c = joinedProductValues;
            }
            if(m.containsKey('Instructions__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Instructions__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                peels.Instructions__c = joinedProductValues;
            }
            if (m.containsKey('Notes__c')) {
                String Notes = (String)m.get('Notes__c');
                if (Notes != null) {
                    Peels.Notes__c = Notes;
                }
            } 
            PeelList.add(Peels);            
            if (m.containsKey('Area')) {
                system.debug('Hello22 '+ m.get('Area') );
                String Areas = (String)m.get('Area');
                system.debug('Hello'+ Areas );
                if (Areas != null) {
                    sb.Area__c = Areas;
                }
            } 
            if(m.containsKey('Injectables__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Injectables__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                sb.Injectables__c = joinedProductValues;
            }
            if (m.containsKey('of_vials__c')) {
                String vials = (String)m.get('of_vials__c');
                if (Vials != null) {
                    sb.of_vials__c = Vials;
                }
            }
            if (m.containsKey('Lot__c')) {
                String lot = (String)m.get('Lot__c');
                if (lot != null) {
                    sb.Lot__c = lot;
                }
            }
            if (m.containsKey('Expiration_date__c')) {
                String dateString2 = (String)m.get('Expiration_date__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    sb.Expiration_date__c = Date.newInstance(year, month, day);
                    System.debug('Expiration_date__c ' + sb.Expiration_date__c);
                }
            }
            if (m.containsKey('Reconstitution__c')) {
                String recon = (String)m.get('Reconstitution__c');
                if (recon != null) {
                    sb.Reconstitution__c = recon;
                }
            }
            if(m.containsKey('Dilution__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Dilution__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                sb.Dilution__c = joinedProductValues;
            }
            sblist.add(sb);
            if(m.containsKey('Areas_treated__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Areas_treated__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                sm.Areas_treated__c = joinedProductValues;
            }
            if (m.containsKey('tx__c')) {
                String tx = (String)m.get('tx__c');
                if (tx != null) {
                    sm.tx__c = tx;
                }
            }
            if(m.containsKey('Topical_anesthesia__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Topical_anesthesia__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                sm.Topical_anesthesia__c = joinedProductValues;
            }
            if (m.containsKey('Number_of_passe__c')) {
                String passes = (String)m.get('Number_of_passe__c');
                if (String.isNotBlank(passes)) {
                    sm.Number_of_passe__c = Integer.valueOf(passes);
                }
            }
            if (m.containsKey('Procedure_depth__c')) {
                String depth = (String)m.get('Procedure_depth__c');
                if (depth != null) {
                    sm.Procedure_depth__c = depth;
                }
            }
            if (m.containsKey('Notes__c')) {
                String notes = (String)m.get('Notes__c');
                if (notes != null) {
                    sm.Notes__c = notes;
                }
            }
            smList.add(sm);
            if (m.containsKey('Areas')) {
                String ar = (String)m.get('Areas');
                if (ar != null) {
                    Tr.Area__c = ar;
                }
            }
            if (m.containsKey('Treatment__c')) {
                String treatment = (String)m.get('Treatment__c');
                if (treatment != null) {
                    Tr.Treatment__c = treatment;
                }
            }
            if (m.containsKey('wavelength__c')) {
                String wave = (String)m.get('wavelength__c');
                if (wave != null) {
                    Tr.wavelength__c = wave;
                }
            }
            if (m.containsKey('Spot_size_mm__c')) {
                String spot = (String)m.get('Spot_size_mm__c');
                if (spot != null) {
                    Tr.Spot_size_mm__c = spot;
                }
            }
            if (m.containsKey('Energy__c')) {
                String energy = (String)m.get('Energy__c');
                if (energy != null) {
                    Tr.Energy__c = energy;
                }
            }
            if (m.containsKey('Rep_rate_hz__c')) {
                String rate = (String)m.get('Rep_rate_hz__c');
                if (rate != null) {
                    Tr.Rep_rate_hz__c = rate;
                }
            }
            if(m.containsKey('Frosting_present__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Frosting_present__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Tr.Frosting_present__c = joinedProductValues;
            }
            if (m.containsKey('Occlusive_balm__c')) {
                Boolean occ = (Boolean)m.get('Occlusive_balm__c');
                System.debug('occ==>'+occ);
                if (occ != null) {
                    Tr.Occlusive_balm__c = Boolean.valueOf(occ);
                    System.debug('Occlusive_balm__c==>'+Tr.Occlusive_balm__c);
                }
            }
            if (m.containsKey('Notes__c')) {
                String notes = (String)m.get('Notes__c');
                if (notes != null) {
                    Tr.Notes__c = notes;
                }
            }
            Trlist.add(Tr);
            if (m.containsKey('Date__c')) {
                String dateString2 = (String)m.get('Date__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    Trs.Date__c = Date.newInstance(year, month, day);
                    System.debug('Date__c ' + Trs.Date__c);
                }
            }
            if (m.containsKey('Hydration_level__c')) {
                String hydration = (String)m.get('Hydration_level__c');
                if (hydration != null) {
                    Trs.Hydration_level__c = hydration;
                }
            }
            if(m.containsKey('Body_area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Body_area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Trs.Body_area__c = joinedProductValues;
            }
            if(m.containsKey('Tx_time__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tx_time__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Trs.Tx_time__c = joinedProductValues;
            }
            if (m.containsKey('Employee_hook_up_initials__c')) {
                String Hook = (String)m.get('Employee_hook_up_initials__c');
                if (hook != null) {
                    Trs.Employee_hook_up_initials__c = hook;
                }
            }
            if (m.containsKey('Power_used__c')) {
                String used = (String)m.get('Power_used__c');
                if (used != null) {
                    Trs.Power_used__c = used;
                }
            }
            if (m.containsKey('Employee_mid_point_initials__c')) {
                String mid = (String)m.get('Employee_mid_point_initials__c');
                if (mid != null) {
                    Trs.Employee_mid_point_initials__c = mid;
                }
            }
            if (m.containsKey('Notes__c')) {
                String notes = (String)m.get('Notes__c');
                if (notes != null) {
                    Trs.Notes__c = notes;
                }
            }
            if (m.containsKey('Employee_removal_initials__c')) {
                String removal = (String)m.get('Hydration_level__c');
                if (removal != null) {
                    Trs.Employee_removal_initials__c = removal;
                }
            }
            if (m.containsKey('Average_tuning__c')) {
                String tuning = (String)m.get('Average_tuning__c');
                if (tuning != null) {
                    Trs.Average_tuning__c = tuning;
                }
            }
            TrsList.add(Trs);
            if (m.containsKey('Date__c')) {
                String dateString2 = (String)m.get('Date__c');
                List<String> onlyDate = dateString2.split(' 00:00:00');
                List<String> yearMonthDay = onlyDate[0].split('-');
                System.debug('yearMonthDay ' + yearMonthDay);
                if (yearMonthDay != null && yearMonthDay.size() == 3) {
                    Integer year = Integer.valueOf(yearMonthDay[0]);
                    Integer month = Integer.valueOf(yearMonthDay[1]);
                    Integer day = Integer.valueOf(yearMonthDay[2]);
                    vq.Date__c = Date.newInstance(year, month, day);
                    System.debug('Date__c ' + vq.Date__c);
                }
            }
            if (m.containsKey('Hydration_level__c')) {
                String hydration = (String)m.get('Hydration_level__c');
                if (hydration != null) {
                    vq.Hydration_level__c = hydration;
                }
            }
            if(m.containsKey('Body_area__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Body_area__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                vq.Body_area__c = joinedProductValues;
            }
            if(m.containsKey('Tx_time__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Tx_time__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                vq.Tx_time__c = joinedProductValues;
            }
            if (m.containsKey('Hook_up_initials__c')) {
                String Hook = (String)m.get('Hook_up_initials__c');
                if (hook != null) {
                    vq.Hook_up_initials__c = hook;
                }
            }
            if (m.containsKey('Power_used__c')) {
                String used = (String)m.get('Power_used__c');
                if (used != null) {
                    vq.Power_used__c = used;
                }
            }
            if (m.containsKey('Employee_mid_point_initials__c')) {
                String mid = (String)m.get('Employee_mid_point_initials__c');
                if (mid != null) {
                    vq.Employee_mid_point_initials__c = mid;
                }
            }
            if (m.containsKey('Notes__c')) {
                String notes = (String)m.get('Notes__c');
                if (notes != null) {
                    vq.Notes__c = notes;
                }
            }
            if (m.containsKey('Employee_removal_initials__c')) {
                String removal = (String)m.get('Hydration_level__c');
                if (removal != null) {
                    vq.Employee_removal_initials__c = removal;
                }
            }
            if (m.containsKey('Average_tuning__c')) {
                String tuning = (String)m.get('Average_tuning__c');
                if (tuning != null) {
                    vq.Average_tuning__c = tuning;
                }
            }
            vqList.add(vq);         
            if (m.containsKey('Weight_Loss_week__c')) {
                String week = (String)m.get('Weight_Loss_week__c');
                if (week != null) {
                    Wl.Weight_Loss_week__c = week;
                }
            }
            if (m.containsKey('Starting_weight__c')) {
                String Starting = (String)m.get('Starting_weight__c');
                if (Starting != null) {
                    Wl.Starting_weight__c = Starting;
                }
            }
            if (m.containsKey('Last_week_weight__c')) {
                String lastWeek = (String)m.get('Last_week_weight__c');
                if (lastWeek != null) {
                    Wl.Last_week_weight__c = lastWeek;
                }
            }
            if (m.containsKey('Todays_weight__c')) {
                String todayWeight = (String)m.get('Todays_weight__c');
                if (todayWeight != null) {
                    Wl.Todays_weight__c = todayWeight;
                }
            }
            if (m.containsKey('Height__c')) {
                String height = (String)m.get('Height__c');
                if (height != null) {
                    Wl.Height__c = height;
                }
            }
            if (m.containsKey('bmi__c')) {
                String bmi = (String)m.get('bmi__c');
                if (bmi != null) {
                    Wl.bmi__c = bmi;
                }
            }
            if (m.containsKey('Starting_muscle_mass__c')) {
                String muscleMass = (String)m.get('Starting_muscle_mass__c');
                if (muscleMass != null) {
                    Wl.Starting_muscle_mass__c = muscleMass;
                }
            }
            if (m.containsKey('Todays_muscle_mass__c')) {
                String todaymuscleMass = (String)m.get('Todays_muscle_mass__c');
                if (todaymuscleMass != null) {
                    Wl.Todays_muscle_mass__c = todaymuscleMass;
                }
            }
            if(m.containsKey('Medicine__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Medicine__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Wl.Medicine__c = joinedProductValues;
            }
            if(m.containsKey('Dosage__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Dosage__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Wl.Dosage__c = joinedProductValues;
            }
            if (m.containsKey('Lot__c')) {
                String lots = (String)m.get('Lot__c');
                if (lots != null) {
                    Wl.Lot__c = lots;
                }
            }
            if (m.containsKey('Expiration__c')) {
                String exp = (String)m.get('Expiration__c');
                if (exp != null) {
                    Wl.Expiration__c = exp;
                }
            }
            if(m.containsKey('Area_injected__cValuesList')){
                List<object> productValuesList = (List<object>)m.get('Area_injected__cValuesList');
                String joinedProductValues = String.join(productValuesList, ';');
                Wl.Area_injected__c = joinedProductValues;
            }
            if (m.containsKey('b12_given__c')) {
                Boolean b12 = (Boolean)m.get('b12_given__c');
                System.debug('b12==>'+b12);
                if (b12 != null) {
                    Wl.b12_given__c = Boolean.valueOf(b12);
                    System.debug('b12_given__c==>'+wl.b12_given__c);
                }
            }
            if (m.containsKey('Zofran_prescribed__c')) {
                Boolean zof = (Boolean)m.get('Zofran_prescribed__c');
                System.debug('zof==>'+zof);
                if (zof != null) {
                    Wl.Zofran_prescribed__c = Boolean.valueOf(zof);
                    System.debug('Zofran_prescribed__c==>'+wl.Zofran_prescribed__c);
                }
            }
            if (m.containsKey('Notes__c')) {
                String notess = (String)m.get('Notes__c');
                if (notess != null) {
                    Wl.Notes__c = notess;
                }
            }
            WlList.add(Wl);              
        }
        if (!ACrToInsert.isEmpty()) {
            insert ACrToInsert;
        }
        if (!HRCList.isEmpty()) {        
            insert HRCList;
        }
        if (!TRCList.isEmpty()) {
            insert TRCList;
        }
        if (!BDList.isEmpty()) {
            insert BDList;
        }
        if (!DFList.isEmpty()) {
            insert DFList;
        }
        if (!EmList.isEmpty()) {
            insert EmList;
        }
        if (!FcList.isEmpty()) {
            insert FcList;
        }
        if (!FlList.isEmpty()) {
            insert FlList;
        }  
        if (!HfList.isEmpty()) {
            insert HfList;
        }
        if (!IPLList.isEmpty()) {
            insert IPLList;
        }
        if (!KyList.isEmpty()) {
            insert KyList;
        }
        if (!HlList.isEmpty()) {
            insert HlList;
        }
        if (!LvList.isEmpty()) {
            insert LvList;
        }
        if (!mdmList.isEmpty()) {
            insert mdmList;
        }
        if (!PeelList.isEmpty()) {
            insert PeelList;
        }
        if (!sbList.isEmpty()) {
            insert sbList;
        }
        if (!smList.isEmpty()) {
            insert smList;
        }
        if (!TrList.isEmpty()) {
            insert TrList;
        }
        if (!TrsList.isEmpty()) {
            insert TrsList;
        }
        if (!vqList.isEmpty()) {
            insert vqList;
        }
        if (!WlList.isEmpty()) {
            insert WlList;
        }     
        List<Id> insertedIds = new List<Id>();
        for (Recommendations_for_Aesthetic_consult__c acr : ACrToInsert) {
            insertedIds.add(acr.Id);
        }
        return JSON.serialize(insertedIds);
    }
    @AuraEnabled
    public static Map<String, List<String>> getPickList(String objApi, List<String> fieldApis) {
        Map<String, List<String>> picklistValuesMap = new Map<String, List<String>>();
        
        // Get the SObjectType from the objApi string
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objApi);
        
        if (sObjectType != null) {
            // Iterate over each field API name
            for (String fieldApi : fieldApis) {
                List<String> picklistValues = new List<String>();
                Schema.DescribeFieldResult fieldResult = sObjectType.getDescribe().fields.getMap().get(fieldApi).getDescribe();
                
                // Iterate through picklist values and add them to the list
                for (Schema.PicklistEntry pickListVal : fieldResult.getPicklistValues()) {
                    picklistValues.add(pickListVal.getLabel());
                }
                
                // Add the picklist values to the map with the field API name as the key
                picklistValuesMap.put(fieldApi, picklistValues);
            }
        }
        system.debug(picklistValuesMap);
        return picklistValuesMap;

   
    }
}