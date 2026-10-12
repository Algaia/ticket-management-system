<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

# users can only view, edit, or delete their own tickets, and accessing another user's ticket ID must return a 403 Forbidden response
class TicketPolicy
{
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function update(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }
}
