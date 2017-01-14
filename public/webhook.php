<?php
$bash = "/bin/bash";
// Where is your deploy script located?
$deploy = "/home/ubuntu/deploy/deploy";
// Get the secret token from the environment variables.
$secret_token = getenv('WEBHOOK_SECRET_TOKEN');

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo 'Webhook is installed.';
    break;
  case 'POST':
    $request_body = file_get_contents('php://input');
    $payload = json_decode($request_body, JSON_OBJECT_AS_ARRAY);

    $generated_signature = 'sha1='.hash_hmac('sha1', $request_body, $secret_token);
    $received_signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

    // Authenticating GitHub using the secret token.
    if ($received_signature != $generated_signature) die;

    // Which repository was pushed to?
    $repository = $payload['repository']['name'];

    // Which branch was pushed to?
    $branch = array();
    preg_match('/(?<=refs\/heads\/).+/i', $payload['ref'], $branch);
    $branch = $branch[0];

    switch ($branch) {
      case 'refactoring':
        exec("sudo /bin/bash -c '/home/ubuntu/deploy/deploy trendgator-client refactoring >/dev/null 2>/dev/null &'");
        echo "sudo /bin/bash -c '/home/ubuntu/deploy/deploy trendgator-client refactoring >/dev/null 2>/dev/null &'";
        break;
    }
    die;
}
