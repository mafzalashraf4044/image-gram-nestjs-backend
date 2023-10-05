import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'isMongoId', async: false })
export class IsMongoId implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) {
      return false;
    }
    return Types.ObjectId.isValid(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid MongoDB ObjectId`;
  }
}
