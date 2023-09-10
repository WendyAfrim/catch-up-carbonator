import {array, boolean, number, object, string} from 'zod';

export const projectSchema = object({
  name:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty(),
  client:
    string()
      .min(3, {message: 'Minimum 3 caractères'})
      .max(50, {message: 'Maximum 50 caractères'})
      .nonempty(),
  start_at:
    string()
      .nonempty('Cette valeur est obligatoire'),
  end_at:
    string()
      .nonempty('Cette valeur est obligatoire'),
  skills: array(object({
    name: string(),
    level: string(),
    nb_exp: string()
  })).nonempty(),
  position:
    string()
      .nonempty('Cette valeur est obligatoire'),
});

// Todo : Assert sur les skills




