public with sharing class ImageUploadController {
    @AuraEnabled
    public static String saveImageToSalesforce(String base64Data, Id recordId) {
        try {
            // Decode the base64 string to a Blob
            String base64Content = base64Data.split(',')[1];
            Blob imageBlob = EncodingUtil.base64Decode(base64Content);
            
            // Create a ContentVersion record to store the image
            ContentVersion contentVersion = new ContentVersion();
            contentVersion.VersionData = imageBlob;
            contentVersion.Title = 'Annotated Image';
            contentVersion.PathOnClient = 'AnnotatedImage.png';
            contentVersion.FirstPublishLocationId = recordId;
            insert contentVersion;
            
            // Retrieve the ContentDocumentId
            ContentVersion insertedContentVersion = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id LIMIT 1];
            
            // Call the flow with the ContentDocumentId
            //  invokeFlow(insertedContentVersion.ContentDocumentId);
            
            return 'Image uploaded and flow launched successfully';
        } catch (Exception e) {
            return 'Error uploading image: ' + e.getMessage();
        }
    }
    
    @AuraEnabled
    public static String saveImageToSalesforce2(String base64Data) {
        try {
            // Manually extract the base64 content
            Integer commaIndex = base64Data.indexOf(',');
            if (commaIndex == -1) {
                throw new AuraHandledException('Invalid base64 data format');
            }
            String base64Content = base64Data.substring(commaIndex + 1);
            
            // Decode the base64 string to a Blob
            Blob imageBlob = EncodingUtil.base64Decode(base64Content);
            
            // Create a ContentVersion record to store the image
            ContentVersion contentVersion = new ContentVersion();
            contentVersion.VersionData = imageBlob;
            contentVersion.Title = 'Annotated Image';
            contentVersion.PathOnClient = 'AnnotatedImage.png';
            insert contentVersion;
            
            // Retrieve the ContentDocumentId
            ContentVersion insertedContentVersion = [
                SELECT ContentDocumentId 
                FROM ContentVersion 
                WHERE Id = :contentVersion.Id 
                LIMIT 1
            ];
            
            return insertedContentVersion.ContentDocumentId;
        } catch (Exception e) {
            return 'Error uploading image: ' + e.getMessage();
        }
    }
    
  /*  @AuraEnabled
    public static void updateImageInSalesforce (Id recordId, String base64OriginalImage, String base64MarkupImage, Id documentId) {
        try {
            // Query to find the existing document with the given ID
            ContentDocument existingDocument = [
                SELECT Id, Title 
                FROM ContentDocument 
                WHERE Id = :documentId 
                LIMIT 1
            ];
            
            if (existingDocument == null) {
                throw new AuraHandledException('No existing document found with the provided ID.');
            }
            
            // Update the original image
            ContentVersion originalImageVersion = new ContentVersion();
            originalImageVersion.ContentDocumentId = existingDocument.Id;
            originalImageVersion.VersionData = EncodingUtil.base64Decode(base64OriginalImage);
            originalImageVersion.PathOnClient = existingDocument.Title + '_original';
            insert originalImageVersion;
            
            // Update the markup image
            ContentVersion markupImageVersion = new ContentVersion();
            markupImageVersion.ContentDocumentId = existingDocument.Id;
            markupImageVersion.VersionData = EncodingUtil.base64Decode(base64MarkupImage);
            markupImageVersion.PathOnClient = existingDocument.Title + '_markup';
            insert markupImageVersion;
            
            System.debug('Images updated successfully.');
        } catch (Exception e) {
            throw new AuraHandledException('Error updating images: ' + e.getMessage());
        }
    }  */
}