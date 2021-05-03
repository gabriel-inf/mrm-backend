const db = require("../models");
const logger = require("../utils/logger");
const model = db.stockItem;
const itemStatusHistoryModel = db.itemStatusHistory;
const { MAINTENANCE, INVENTORY, RENTED, VALID_STATUSES } = require("../utils/itemConstants");


class ItemService {


    static async updateStockItemStatus(id, newStatus, comment) {

        if (!isValidNewStatus(newStatus)) throw "Invalid Status";

        try {
            let stockItemModel = await getStockItemModel(id);
            if (!isStatusChanging(newStatus, stockItemModel)) throw `Item is already in ${newStatus}`;
            await stockItemModel.update(getNewStatusObj(newStatus));
            const histEntry = await itemStatusHistoryModel.create(getNewItemStatusHistoryEntry(newStatus, comment, id));

            return histEntry;
        }
        catch (err) {
            logger.error("updateStockItemStatus - " + err);
            throw err;
        }

    }

    static async registerLeave(id) {
        let stockItemModel = await getStockItemModel(id);
        if (!isItemReadyForLeave(stockItemModel)) throw "Item is not ready for leave, make sure it has a ready rental contract";
        ItemService.setReadyForRental(id, false);
        return ItemService.updateStockItemStatus(id, "RENTED", null);
    }

    /**
     * Updates a flag that states is the item has a ready rental waiting for it to leave
     * @param {*} itemId 
     * @param {*} isReadyForRental 
     */
    static async setReadyForRental(itemId, isReadyForRental) {
        try {
            let stockItemModel = await getStockItemModel(itemId);

            const updatedItem = await stockItemModel.update({
                isReadyToBeRented: isReadyForRental
            });
            return updatedItem;
        } catch (err) {
            logger.error("setReadyForRental - " + err);
            throw err;
        }
    }

}

async function getStockItemModel(id) {
    return await model.findOne({
        where: {
            id: id
        }
    });
}

function isItemReadyForLeave(item) {
    return item.status === INVENTORY
        && item.isReadyToBeRented;
}

function isValidNewStatus(newStatus) {
    return VALID_STATUSES.includes(newStatus);
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