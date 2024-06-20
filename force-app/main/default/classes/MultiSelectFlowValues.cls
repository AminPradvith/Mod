global class MultiSelectFlowValues {
   @InvocableMethod
   public static List<List<String>> CheckValues(List<String> values) {
      if (!values.isEmpty()) {
         String tempStr = values[0];
         List<String> lstnew = tempStr.split(';'); // Split based on semicolon only
         List<List<String>> finalLst = new List<List<String>>();
         finalLst.add(lstnew);
         return finalLst;
      } else {
         return null;
      }
   }
}