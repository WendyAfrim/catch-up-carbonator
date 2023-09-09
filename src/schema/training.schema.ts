import {object, string} from 'zod';

export const trainingSchema = object({
  name:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(20, {message: 'Maximum 20 caractères'})
      .nonempty(),
  link:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty(),
  level:
    string()
      .nonempty('Cette valeur est obligatoire')
});



