import {object, string} from 'zod';

export const careerSchema = object({
  position:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty(),
  description:
    string()
      .min(15, {message: 'Minimum 15 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty(),
  prerequisite:
    string()
      .nonempty('Cette valeur est obligatoire')
});

// Todo : Assert sur les goals


