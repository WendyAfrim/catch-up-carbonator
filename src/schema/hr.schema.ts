import {object, string} from 'zod';

export const hrSchema = object({
  firstname:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty({message: 'Cette valeur est obligatoire'}),
  lastname:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty({message: 'Cette valeur est obligatoire'}),
  email:
    string()
      .email({message: 'Email invalide'})
});



