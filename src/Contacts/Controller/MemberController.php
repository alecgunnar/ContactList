<?php

/**
 * Contact List Manager
 *
 * @author  Alec Carpenter <gunnar94@me.com>
 * @version 1.0.0
 */

namespace Contacts\Controller;

class MemberController
{
    const STORAGE_FILE = 'members.json';

    public function getAll()
    {
        return file_get_contents(DATABASE_PATH . DIRECTORY_SEPARATOR . static::STORAGE_FILE);
    }
}
