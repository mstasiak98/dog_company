<?php

namespace App\Console\Commands;

use App\Enums\CareStateEnum;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DogCareStatusUpdater extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dogcare:hourly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update past dog care statuses';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::table('dog_cares')
            ->where('end_date', '<', Carbon::today()->format('Y-m-d H:i:s'))
            ->update(['state_id' => CareStateEnum::DONE->value]);
        $this->info('Successfully updated dog care statuses');
    }
}
