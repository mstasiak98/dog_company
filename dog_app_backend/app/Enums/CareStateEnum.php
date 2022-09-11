<?php

namespace App\Enums;

enum CareStateEnum: int
{
    case RECEIVED = 1;
    case OWNER_ACCEPTED = 2;
    case OWNER_REJECTED = 3;
    case DONE = 4;
    case CANCELLED = 5;
}
