# nestjs-plus-worker-queue-exponential-backoff-example

## Note: This was simply me exerimenting with an exponential back off example using NestJS Plus and RabbitMQ.  The code in this repo is not production ready, and is only an example of how this might be done.

Flow:

1. Main Exchange -> Main Queue 
2. If failure, goto next step.
3. ErrorHandler strategy called due to timeout or failure.
4. Message sent to RetryExchange and a dynamic queue is created with starting ttl.  Queue Dead Letter exchange is set to MainQueue, once ttl expires message is placed back on MainQueue.  Header info is added to message to track number of times retried.
5. If failure, goto next step.
6. Message is sent to RetryExchange again, this time header from Step#4 is read, and ttl is exponentially increased, and another queue with new ttl is created.  Again dead letter exchange is set to main queue.
7. If failure, repeat step 5-6 until retry limit reached.

Missing pieces:

1. Theoretically this solution works, but theres a couple problems with the current implementation.  The NestJS Plus implementation forces you to place the error handling logic in the worker. If the worker suffers a catastrophic failure the errorhandler code will not fire and the message will be lost.  Perhaps there should be another watcher responsible for this behavior?  
2. There is no good solution to timing out the worker, and it could sit on the main queue indefinitely.  Not sure what a good solution to this is...A ttl only applies to messages without an active consumer so applying a ttl would no nothing.
3. There is currently no errorQueue implemented, ideally after your retry limit is passed the message would be forwarded to an error queue for inspection manually later so its not lost.


With all that said, I am not convinced using RabbitMQ as a worker queue with RabbitJS is the best option.  There are other frameworks that are significantly more mature for this in other languages, like Celery or Sneakers.  My decision was to abandon this research project and use a Redis based solution for my needs like BullMQ. 

Feel free to commit to this project if you want to take it on, I will accept them. But I will not be actively maintaining it.
