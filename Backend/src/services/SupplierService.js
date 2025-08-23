const db = require('../../models/index');
const Supplier = db.Supplier;
const Product = db.Product;

const HTTP_OK = process.env.HTTP_OK || 200;

class SupplierService {
    async searchSuppliers({ supplierID, phoneNumber, email, address, supplierName }, page = 1, limit = 10) {
        try {
            const { Op } = require('sequelize');
            const where = {};
            if (supplierID) where.supplierID = { [Op.like]: `%${supplierID}%` };
            if (phoneNumber) where.phoneNumber = { [Op.like]: `%${phoneNumber}%` };
            if (email) where.email = { [Op.like]: `%${email}%` };
            if (address) where.address = { [Op.like]: `%${address}%` };
            if (supplierName) where.supplierName = { [Op.like]: `%${supplierName}%` };
            const offset = (page - 1) * limit;
            const { count, rows } = await Supplier.findAndCountAll({
                where,
                offset,
                limit,
                order: [['supplierID', 'ASC']],
            });
            return {
                suppliers: rows,
                total: count,
                page,
                totalPages: Math.ceil(count / limit),
            };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getSupplierByEmail(email) {
        try {
            return await Supplier.findOne({ where: { email } });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getSupplierByID(supplierID) {
        try {
            return await Supplier.findOne({ where: { supplierID } });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getAllSuppliers(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const { count, rows } = await Supplier.findAndCountAll({
                offset,
                limit,
                order: [['supplierID', 'ASC']],
            });
            return {
                suppliers: rows,
                total: count,
                page,
                totalPages: Math.ceil(count / limit),
            };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    createSupplier(newSupplier) {
        return new Promise(async (resolve, reject) => {
            const transaction = await db.sequelize.transaction();
            try {
                const { supplierID, supplierName, address, phoneNumber, email, status } = newSupplier;
                const supplierFind = await Supplier.findOne({ where: { supplierID } });
                if (supplierFind) {
                    resolve({
                        status: 'ERR',
                        message: 'Mã nhà cung cấp đã tồn tại',
                    });
                } else {
                    const supplier = await Supplier.create(
                        { supplierID, supplierName, address, phoneNumber, email, status },
                        { transaction },
                    );
                    await transaction.commit();
                    resolve({
                        status: 'OK',
                        message: 'Tạo nhà cung cấp thành công',
                        supplier,
                    });
                }
            } catch (e) {
                await transaction.rollback();
                console.log(e);
                reject(e);
            }
        });
    }

    updateSupplier(supplierID, updateData) {
        return new Promise(async (resolve, reject) => {
            const transaction = await db.sequelize.transaction();
            try {
                const supplier = await Supplier.findOne({ where: { supplierID } });
                if (!supplier) {
                    resolve({
                        status: 'ERR',
                        message: 'Không tìm thấy nhà cung cấp',
                    });
                } else {
                    await supplier.update(updateData, { transaction });
                    await transaction.commit();
                    resolve({
                        status: 'OK',
                        message: 'Cập nhật nhà cung cấp thành công',
                        supplier,
                    });
                }
            } catch (e) {
                await transaction.rollback();
                console.log(e);
                reject(e);
            }
        });
    }

    deleteSupplier(supplierID) {
        return new Promise(async (resolve, reject) => {
            try {
                const supplier = await Supplier.findOne({ where: { supplierID } });
                if (!supplier) {
                    resolve({
                        status: 'ERR',
                        message: 'Không tìm thấy nhà cung cấp',
                    });
                } else {
                    await supplier.destroy();
                    resolve({
                        status: 'OK',
                        message: 'Xóa nhà cung cấp thành công',
                    });
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    getProductsBySupplierID(supplierID) {
        return new Promise(async (resolve, reject) => {
            try {
                const supplier = await Supplier.findByPk(supplierID, {
                    include: [
                        {
                            model: Product,
                            as: 'products',
                            through: { attributes: [] }, // không lấy thông tin batch
                        },
                    ],
                });
                if (supplier) {
                    resolve({
                        statusHttp: 200,
                        status: 'OK',
                        message: 'Lấy danh sách sản phẩm thành công',
                        products: supplier.products,
                    });
                } else {
                    resolve({
                        statusHttp: 404,
                        status: 'ERR',
                        message: 'Không tìm thấy sản phẩm nào',
                    });
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
}

module.exports = new SupplierService();
