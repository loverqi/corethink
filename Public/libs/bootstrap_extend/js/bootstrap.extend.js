$(function() {

    //ajax get请求
    $('body').on('click', '.ajax-get', function() {
        var target;
        var that = this;
        if ($(this).hasClass('confirm')) {
            if (!confirm('确认要执行该操作吗?')) {
                return false;
            }
        }
        if ((target = $(this).attr('href')) || (target = $(this).attr('url'))) {
            $.get(target).success(function(data) {
                if (data.status == 1) {
                    if (data.url) {
                        message = data.info + ' 页面即将自动跳转~';
                    } else {
                        message = data.info;
                    }
                    $.bootstrapGrowl(message, {
                        type: 'success',
                        align: 'center',
                        width: 'auto',
                    });
                    setTimeout(function() {
                        $(that).removeClass('disabled').prop('disabled', false);
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            location.reload();
                        }
                    }, 2000);
                } else {
                    if (data.login == 1) {
                        $('#login-modal').modal(); //弹出登陆框
                    } else {
                        $.bootstrapGrowl(data.info, {
                            type: 'success',
                            align: 'center',
                            width: 'auto',
                        });
                    }
                    setTimeout(function() {
                        $(that).removeClass('disabled').prop('disabled', false);
                    }, 2000);
                }
            });
        }
        return false;
    });



    //ajax post submit请求
    $('body').on('click', '.ajax-post', function() {
        var target, query, form;
        var target_form = $(this).attr('target-form');
        var that = this;
        var nead_confirm = false;

        if (($(this).attr('type') == 'submit') || (target = $(this).attr('href')) || (target = $(this).attr('url'))) {
            form = $('.' + target_form);
            if ($(this).attr('hide-data') === 'true') { //无数据时也可以使用的功能
                form = $('.hide-data');
                query = form.serialize();
            } else if (form.get(0) == undefined) {
                return false;
            } else if (form.get(0).nodeName == 'FORM') {
                if ($(this).hasClass('confirm')) {
                    if (!confirm('确认要执行该操作吗?')) {
                        return false;
                    }
                }
                if ($(this).attr('url') !== undefined) {
                    target = $(this).attr('url');
                } else {
                    target = form.get(0).action;
                }
                query = form.serialize();
            } else if (form.get(0).nodeName == 'INPUT' || form.get(0).nodeName == 'SELECT' || form.get(0).nodeName == 'TEXTAREA') {
                form.each(function(k, v) {
                    if (v.type == 'checkbox' && v.checked == true) {
                        nead_confirm = true;
                    }
                });
                if (nead_confirm && $(this).hasClass('confirm')) {
                    if (!confirm('确认要执行该操作吗?')) {
                        return false;
                    }
                }
                query = form.serialize();
            } else {
                if ($(this).hasClass('confirm')) {
                    if (!confirm('确认要执行该操作吗?')) {
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }

            $(that).addClass('disabled').attr('autocomplete', 'off').prop('disabled', true);
            $.post(target, query).success(function(data) {

                if (data.status == 1) {
                    if (data.url) {
                        message = data.info + ' 页面即将自动跳转~';
                    } else {
                        message = data.info;
                    }
                    $.bootstrapGrowl(message, {
                        type: 'success',
                        align: 'center',
                        width: 'auto',
                    });
                    setTimeout(function() {
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            location.reload();
                        }
                    }, 2000);
                } else {
                    $.bootstrapGrowl(data.info, {
                        type: 'danger',
                        align: 'center',
                        width: 'auto',
                    });
                    setTimeout(function() {
                        $(that).removeClass('disabled').prop('disabled', false);
                    }, 2000);
                }
            });
        }
        return false;
    });

});