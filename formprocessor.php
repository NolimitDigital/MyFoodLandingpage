<?php 

/* Einstellungen */
$sender = 'info@creativelion.com';
$rcpt = 'office@creativelion.com';
$subject = 'Newsletter MyFood';
$backupDirectory = 'mail_backup';

/* Form processor */

$content = '';

foreach($_POST as $key=>$value) {
	$content .= str_pad($key.':', 20) . ' ' . $value . "\n";
}

// Als Datei speichern
$myFile = $backupDirectory . '/' . time() . '.txt';
$fh = fopen($myFile, 'w') or die("can't open file");
fwrite($fh, $content);
fclose($fh);

// Per Mail senden
$successful = mail($rcpt, $subject, $content, 'From: '.$sender);
echo $successful ? 'OK' : 'ERROR (send mail)';
?>