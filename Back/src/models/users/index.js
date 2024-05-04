import { insertUserModel } from './insertUserModel.js';
import { selectUserByEmailModel } from './selectUserByEmailModel.js';
import { selectUserByUsernameModel } from './selectUserByUsernameModel.js';
import { selectUserByIdModel } from './selectUserByIdModel.js';
import { updateUserActivationModel } from './updateUserActivationModel.js';
import { selectUserByValidationCodeModel } from './selectUserByValidationCodeModel.js';
import { updateUserModel } from './updateUserModel.js';
import { selectDoctorByDoctorRegistrationNumberModel } from './selectDoctorByDoctorRegistrationNumberModel.js';
// import { updateDoctorModel } from './updateDoctorModel.js';
import { selectDoctorByUserIdModel } from './selectDoctorByUserIdModel.js';

export {
  insertUserModel,
  selectUserByUsernameModel,
  selectUserByEmailModel,
  selectUserByIdModel,
  updateUserActivationModel,
  selectUserByValidationCodeModel,
  updateUserModel,
  selectDoctorByDoctorRegistrationNumberModel,
  // updateDoctorModel,
  selectDoctorByUserIdModel,
};
