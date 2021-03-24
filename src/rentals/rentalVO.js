export default class RentalVO {

    /**
     * Full contructor, in case we need
     * 
     * @param {string} id 
     * @param {string} customer 
     * @param {string[]} stockItemsIds
     * @param {date} startDate
     * @param {date} endDate
     * @param {date} additive
     * @param {string} invoiceId
     * @param {float} totalValue
     * @param {string} status
     * @param {date} approvalDate 
     */
    constructor(id, customer, stockItems, startDate, endDate, additive,invoiceId, 
        totalValue, status, approvalDate) {
        
        this.id = id;
        this.customer = customer;
        this.stockItems = stockItems;
        this.startDate = startDate;
        this.endDate = endDate;
        this.additive = additive;
        this.invoiceId = invoiceId;
        this.totalValue = totalValue;
        this.status = status;
        this.approvalDate = approvalDate;
    }

    getId() {
        return this.id;
    }

    getCustomer() {
        return this.customer;
    }

    getStockItems() {
        return this.stockItems;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    getAdditive() {
        return this.additive;
    }

    getInvoiceId() {
        return this.invoiceId;
    }

    getTotalValue() {
        return this.totalValue;
    }

    getStatus() {
        return this.status;
    }

    getApprovalDate() {
        return this.approvalDate;
    }

    setId(id){
        this.id = id;
    }

    setCustomer(customer){
        this.customer = customer;
    }

    setStockitems(stockItems){
        this.stockItems = stockItems;
    }
    
    setStartdate(startDate){
        this.startDate = startDate;
    }

    setEnddate(endDate){
        this.endDate = endDate;
    }

    setAdditive(additive){
        this.additive = additive;
    }

    setInvoiceid(invoiceId){
        this.invoiceId = invoiceId;
    }

    setTotalvalue(totalValue){
        this.totalValue = totalValue;
    }

    setStatus(status){
        this.status = status;
    }

    setApprovaldate(approvalDate){
        this.approvalDate = approvalDate;
    }  

}