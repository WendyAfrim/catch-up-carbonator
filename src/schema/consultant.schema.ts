import {boolean, object, string} from 'zod';

export const consultantSchema = object({
  firstname:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty(),
  lastname:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty(),
  email:
    string()
      .email({message: 'Email invalide'}),
  hired_as:
    string()
      .nonempty('Cette valeur est obligatoire'),
  state:
    boolean(),
  begin_at:
    string()
      .nonempty('Cette valeur est obligatoire')
});



