import express from 'express';
import Television from './models/Television.js';     //

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;


//app.get("/", async function(req, res) {                       //
  const wishList = await Television.loadMany({ bought: 0});       //
  res.render('Television.ejs', { wishList });  //
//});


app.get("/", async function(req, res) {
  // Récupérez la liste des téléviseurs désirés depuis la base de données
  const wishList = await Television.loadMany({ bought: 0 });
 
  // Récupérez la liste des téléviseurs achetés depuis la base de données
  const televisionsAchetees = await Television.loadMany({ bought: 1 });

  // Calculer le montant total dépensé
  const montantTotal = televisionsAchetees.reduce((total, television) => total + television.prix, 0);

  // Rendre la page en passant la liste des téléviseurs désirés, la liste des téléviseurs achetés, et le montant total
  res.render('Television', { wishList, televisionsAchetees, montantTotal });
});






app.post('/ajouter-television', async (req, res) => {
  // Récupérez les données du formulaire depuis req.body
  const { marque, prix, taille, bought, cassé, cause } = req.body;

  // Créez une nouvelle instance de Television avec les données du formulaire
  const nouvelleTelevision = new Television({ marque, prix, taille, bought, cassé, cause});

  // Enregistrez la nouvelle télévision dans la base de données
  await nouvelleTelevision.save();

  // Redirigez l'utilisateur vers la page d'accueil ou effectuez toute autre action nécessaire
  res.redirect('/');
});



app.post('/acheter-television/:id', async (req, res) => {
  // Récupérez l'ID de la télévision depuis les paramètres d'URL
  const televisionId = req.params.id;

  // Chargez la télévision à partir de la base de données en utilisant son ID
  const television = await Television.load({ id: televisionId });

  // Mettez à jour le champ 'bought' pour marquer la télévision comme achetée
  television.bought = 1; // Supposons que '1' signifie acheté, ajustez selon votre modèle de données

  // Enregistrez la mise à jour dans la base de données
  await television.save();

  // Redirigez l'utilisateur vers la page d'accueil ou effectuez toute autre action nécessaire
  res.redirect('/');
});





app.post('/casser-television/:id', async (req, res) => {
  // Récupérez l'ID de la télévision à partir des paramètres de la requête
  const televisionId = req.params.id;

  // Récupérez les données du formulaire depuis req.body (par exemple, le mode de casse)
  const { modeDeCassee } = req.body;

  // Chargez la télévision à partir de la base de données en utilisant l'ID
  const television = await Television.load({ id: televisionId });

  // Vérifiez si la télévision existe
  if (!television) {
    return res.status(404).send('Télévision non trouvée.');
  }

  // Mettez à jour les champs pertinents de la télévision dans la base de données
  television.update({ cassé: true, modeDeCassee });

  // Enregistrez les modifications dans la base de données
  await television.save();

  // Redirigez l'utilisateur vers la page d'accueil ou effectuez toute autre action nécessaire
  res.redirect('/');
});







// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur is running on port ${port}`);
});



























//app.post("/add", async function (req, res) {
  //const task = new Task();
  //task.task = req.body.task
  //await task.save();
  //res.redirect('/');
//});

//app.get("/delete/:id", async function (req, res) {
  //await Task.delete({ id: req.params.id });
  //res.redirect('/');
//});

//app.get("/", async function (req, res) {
  //const tasks = await Task.loadMany();
  //res.render('listTasks.ejs', { tasks: tasks });
//});


