<?php

/**
 * Contact List Manager
 *
 * @author  Alec Carpenter <gunnar94@me.com>
 * @version 1.0.0
 */

use Silex\Application;
use Silex\Provider\SessionServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

/*
 * Define commonly used paths/files
 */

define('ROOT_PATH', dirname(__DIR__));
define('VIEW_PATH', ROOT_PATH . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'Contacts' . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'views');
define('CONFIG_FILE', ROOT_PATH . DIRECTORY_SEPARATOR . 'config.json');
define('DATABASE_PATH', ROOT_PATH . DIRECTORY_SEPARATOR . 'db');

/*
 * Load composer autoloader
 */

require_once(ROOT_PATH . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php');

/*
 * Sign in information
 */

define('USERNAME', 'username');
define('PASSWORD', 'password');

/*
 * Create the application
 */

$app = new Application();

/*
 * Register service providers
 */

$app->register(new SessionServiceProvider());

/*
 * Register services
 */

$app['twig'] = $app->share(function () {
   $env = new Twig_Environment(new Twig_Loader_Filesystem(VIEW_PATH));

   $env->addGlobal('config', json_decode(file_get_contents(CONFIG_FILE), true));

   return $env;
});

/*
 * Define controllers
 */

$app['member.controller'] = $app->share(function () {
    return new Contacts\Controller\MemberController();
});

/*
 * Define middlewares
 */

$app->before(function (Request $request, Application $app) {
    if ($request->getPathInfo() != '/sign-in' && $app['session']->get('signed_in') != true) {
        return new RedirectResponse('/sign-in');
    }
});

/*
 * Define routes
 */

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html.twig');
});

$app->get('/sign-in', function () use ($app) {
    $username = $app['request']->server->get('PHP_AUTH_USER', false);
    $password = $app['request']->server->get('PHP_AUTH_PW');

    if ($username === USERNAME && $password === PASSWORD) {
        $app['session']->set('signed_in', true);
        return $app->redirect('/');
    }

    $response = new Response();
    $response->headers->set('WWW-Authenticate', 'Basic realm="Contacts Constact List"');
    $response->setStatusCode(401, 'Please sign in.');
    return $response;
});

$app->get('/members', [$app['member.controller'], 'getAll']);

$app->run();
