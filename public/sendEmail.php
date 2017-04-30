<?php

mail("nobody@example.com", "the subject", $message,
    "From: webmaster@ example.com \r\n"
    ."X-Mailer: PHP/" . phpversion());


?>