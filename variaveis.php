<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curso php</title>
</head>

<body>
    
    <?php
        //string
        $nome = 'Wendel';


        //ind
        $idade = 25;

        //float
        $peso = 102.5;

        //booblean
        $fumante_sn = true;

        //........Logica....

        $idade = 26;

    ?>

    <h2>Ficha cadastral</h2>

    <br>
    <p>Nome: <?php echo $nome; ?></p>
    <br>
    <p>Idade: <?php echo $idade; ?></p>
    <br>
    <p>Peso <?php echo $peso; ?></p>
    <br>
    <p>Fumante <?php echo $fumante_sn; ?></p>

</body>

</html>