<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curso php</title>
</head>

<body>

    <?php
    //
    $usuario = true;
    $valor_compra = 225;
    $valor_frente = 50;
    $recebeu_deconto = false;


    if ($usuario == true && $valor_compra >= 100) {
        # code...
        $valor_frente = 0;
        $recebeu_deconto = true;
    }
    ?>
    <h2>Detalhes do pedido</h2>
    <p>Possui cartão da logo 
        <?php if ($usuario == true) {
             echo 'Sim';
            } else {
                echo 'Não';
            } 
        ?> 
    </p>
    <p>Valor da compra: <?php echo "R$$valor_compra,00" ?> </p>

    <p>Recebeu o desconto no frente ?
        <?php if ($usuario == true) {
             echo 'Sim';
            } else {
                echo 'Não';
            } 
        ?> 
    </p>
</body>

</html>