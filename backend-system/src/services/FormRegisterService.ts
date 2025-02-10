import axios from 'axios';
import dotenv from 'dotenv';
import httpStatus from 'http-status';
import { Op } from 'sequelize';
import { RegisterFormDTO } from '~/dtos/RegisterForm.dto';
import { SendEmailToClientDTO } from '~/dtos/SendEmailToClient.dto';
import { UpdateStatusFormDTO } from '~/dtos/UpdateStatusForm.dto';
import Car from '~/models/Car';
import FormRegister from '~/models/FormRegister';
import User from '~/models/User';
import { ICar, IQueryForm, IUser } from '~/utils/interface';
import { ResponseHandler } from '~/utils/Response';
import EmailService from './EmailService';
dotenv.config();

class FormRegisterService {
    async registerFormService(data: RegisterFormDTO) {
        try {
            const [userData, carData] = (await Promise.all([
                await User.findOne({
                    where: {
                        id: data.user_id,
                    },
                }),
                await Car.findOne({
                    where: {
                        id: data.car_id,
                    },
                }),
            ])) as [IUser | null, ICar | null];

            if (!userData || !carData) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'User or Car not found');
            }

            const html = `
            # Có thông báo mới đăng ký lái thử xe:
              - Họ Và Tên: ${userData.first_name} ${userData.last_name}
              - Email: ${userData.email}
              - Số điện thoại: ${userData.phone_number}
              - Địa chỉ: ${userData.address_detail}
              - Xe muốn lái thử: ${carData?.title ? carData?.title : 'Đang cập nhật'}
              - Thông tin thêm: ${data.note}
              - Thời gian: ${new Date(data.time).toLocaleString()}
          `;
            await axios.post(`https://api.telegram.org/bot${process.env.TOKEN_BOT_TELEGRAM}/sendMessage`, {
                chat_id: process.env.CHAT_ID_TELE,
                text: html,
            });

            return ResponseHandler(httpStatus.OK, null, 'Register form successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleGetAllForm(query: IQueryForm) {
        try {
            let data;
            const queryOptions: any = {};
            const orderOpion: any = {};
            if (query.status) {
                queryOptions['status'] = query.status === 'approved' ? true : false;
            }

            if (query.sort) {
                orderOpion.order = [['createdAt', query.sort]];
            }

            if (query.q) {
                data = await FormRegister.findAll({
                    where: queryOptions,
                    ...orderOpion,
                    include: [
                        {
                            model: User,
                            as: 'user_data',
                            where: {
                                [Op.or]: [
                                    { first_name: { [Op.like]: `%${query.q}%` } },
                                    { last_name: { [Op.like]: `%${query.q}%` } },
                                    { email: { [Op.like]: `%${query.q}%` } },
                                    { phone_number: { [Op.like]: `%${query.q}%` } },
                                    { address_detail: { [Op.like]: `%${query.q}%` } },
                                ],
                            },
                            attributes: {
                                exclude: ['password'],
                            },
                        },
                    ],
                });
            } else {
                data = await FormRegister.findAll({
                    where: queryOptions,
                    ...orderOpion,
                    include: [
                        {
                            model: User,
                            as: 'user_data',
                            attributes: {
                                exclude: ['password'],
                            },
                        },
                    ],
                });
            }

            return ResponseHandler(httpStatus.OK, data, 'Get FormRegister form successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleUpdateStatus(data: UpdateStatusFormDTO) {
        try {
            await FormRegister.update(
                {
                    status: data.status,
                },
                {
                    where: {
                        id: data.id_form,
                    },
                },
            );

            return ResponseHandler(httpStatus.OK, null, 'Update Form Successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async handleSendEmail(data: SendEmailToClientDTO) {
        try {
            await EmailService.SendEmailSalesRegistrationByCustomer({
                email: data.email,
                html: data.html,
            });

            return ResponseHandler(httpStatus.OK, null, 'Send Email Successfully'); 
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new FormRegisterService();
