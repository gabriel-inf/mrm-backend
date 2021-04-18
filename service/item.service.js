const db = require("../models");
const logger = require("../utils/logger");
const model = db.StockItem;
const itemStatusHistoryModel = db.ItemStatusHistory;

const validStatus = ["MAINTENANCE", "INVENTORY", "RENTED"];


class ItemService {
    
    
    static async updateStockItemStatus(id, newStatus, comment) {
        
        if (!isValidNewStatus(newStatus)) throw "Invalid Status";

        try {
            let stockItemModel = await model.findOne({
              where: {
                id: id
              }
            });
            if (!isStatusChanging(newStatus, stockItemModel)) throw `Item is already in ${newStatus}`;
            await stockItemModel.update(getNewStatusObj(newStatus));
            const histEntry = await itemStatusHistoryModel.create(getNewItemStatusHistoryEntry(newStatus, comment, id));
    
            return histEntry;
        
        }
        catch(err){
            logger.error(err);
            throw err;
        }

    }
}

function isValidNewStatus(newStatus) { 
    return validStatus.includes(newStatus);
}

function isStatusChanging(newStatus, stockItemModel) {
    return newStatus !== stockItemModel.status;
}

function getNewStatusObj(status) {
    return {
        status: status
    };
}

function getNewItemStatusHistoryEntry(status, comment, itemId) {
    return {
        status: status,
        comment: comment,
        StockItemId: itemId
    };
}


module.exports = ItemService;