import Model from './Model.js';





export default class Television extends Model {

  static table = "televisions";
  static primary = ["id"];


  // Propriétés du modèle correspondant aux colonnes de la table
  id;
  marque;
  prix;
  taille;
  bought;
  cassé;
  cause;
}


