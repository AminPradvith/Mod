import {LightningElement} from "lwc";
import {ShowToastEvent} from "lightning/platformShowToastEvent";
export default class FlowInLwc extends LightningElement {
	flowApiName = "Client_Appointment"; // api name of your flow

	// Setting flow input variables
	ClientId = "003Dh00001VuiuFIAR";
	flowInputVariables = [
		{
			name: "recordId",
			type: "String",
			value: this.ClientId,
		},
	];

        // do something when flow status changed
	handleFlowStatusChange(event) {
		console.log("flow status", event.detail.status);
		if (event.detail.status === "FINISHED") {
			this.dispatchEvent(
				new ShowToastEvent({
					title: "Success",
					message: "Flow Finished Successfully",
					variant: "success",
				})
			);
		}
	}
}