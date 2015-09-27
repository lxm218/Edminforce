/**
 * Created on 9/25/15.
 */


//////////////////////定时任务/////////////////////////////
//后续处理  此过程若中断 可由定时程序确保其完成
function cron_move_applied_to_done() {
    if (this.connection) return;

    var allCarts = get_carts({'status': 'applied'})

    //可能有多个cart
    allCarts.forEach(function (cart) {
        _move_to_done(cart)
    })
}
//定时程序调用 走 expired状态流程
function cron_expiring() {


}


shopping_cart_export({
    cron_move_applied_to_done: cron_move_applied_to_done,
    cron_expiring: cron_expiring
})


