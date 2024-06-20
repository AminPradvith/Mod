public with sharing class FileController {
    @AuraEnabled(cacheable=true)
    public static List<ContentDocumentLink> getFilesByRecordId(Id recordId) {
        return [
            SELECT ContentDocumentId, ContentDocument.Title
            FROM ContentDocumentLink
            WHERE LinkedEntityId = :recordId
        ];
    }

    @AuraEnabled
    public static String getFileContent(Id contentDocumentId) {
        ContentVersion contentVersion = [
            SELECT VersionData
            FROM ContentVersion
            WHERE ContentDocumentId = :contentDocumentId
            LIMIT 1
        ];
        return 'data:image/png;base64,' + EncodingUtil.base64Encode(contentVersion.VersionData);
    }
}