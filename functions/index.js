const functions = require('firebase-functions')
const admin = require('firebase-admin')

// função não funciona no firebase

admin.initializeApp()

exports.soma = functions.database
  .ref('/movimentacoes/{dia}')
  .onWrite(async (change, context) => {
    console.log(context)
    const mesesRef = admin.database().ref('/meses/' + context.params.dia)
    const movimentacoesRef = change.after.ref
    const movimentacoesSS = await movimentacoesRef.once('value')
    const movimentacoes = movimentacoesSS.val()

    let entradas = 0
    let saidas = 0

    Object.keys(movimentacoes).forEach((m) => {
      if (movimentacoes[m].valor > 0) {
        entradas += movimentacoes[m].valor
      } else {
        saidas += movimentacoes[m].valor
      }
    })
    return mesesRef.transaction((current) => {
      if (current === null) {
        return {
          entradas,
          saidas,
          previsao_ent: 0,
          previsao_sai: 0
        }
      }
      return {
        ...current,
        entradas,
        saidas
      }
    })
  })
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
