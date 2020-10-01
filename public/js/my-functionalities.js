(function ($) {
        'use strict';
        const formNewPost = $('form#new-post');
        if (formNewPost) {
            formNewPost.on('submit', async (e) => {
                // showAlert('error', 'Error al intentar crear el post!', 'asasdas');
                e.preventDefault();
                // toastr.error('Error', 'Error al intentar crear el post!');
                const postTitle = formNewPost.find('input#title');
                const postContent = formNewPost.find('#content');
                const postCategory = formNewPost.find('#categoryId');
                const postImageElement = formNewPost.find('#image');
                const postImageFiles = postImageElement[0].files;
                if (postImageFiles.length === 0) {
                    toastr.error('Para crear un post necesitas proveer una imagen!', 'Datos invalidos.');
                    return;
                }

                const data = new FormData();
                data.append('title', postTitle.val());
                data.append('content', postContent.val());
                data.append('categoryId', postCategory.val());
                data.append('photo', postImageFiles[0]);
                $.ajax({
                    url: "/posts",
                    type: "POST",
                    data,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false   // tell jQuery not to set contentType
                }).done(res => {
                    formNewPost.find
                    ('.form-control-file').html('Selecciona una imagen');
                    toastr.info('Tu ' +
                        'post has sido creado!', 'Exito');
                    postTitle.val('');
                    postContent.val('');
                    postImageElement.val(null)
                }).fail(er => {
                    DisplayMessagesFromRequestError(er);
                    console.warn({postCategory: postCategory.val(), postContent: postContent.val(), postTitle})
                });
            })
        }


        $('').on('click', function (e) {
            $.delete(`/posts/${postId}`)
                .done(() => {
                    toastr.info('El post seleccionado fue eliminado!', 'Exito');
                })
                .fail(err => {
                    toastr.error('No se pudo eliminar eliminar el post seleccionado!', 'Error')
                })
        });

        function DisplayMessagesFromRequestError(err, defaultMessage) {
            if (err.status === 400 && err.responseJSON && err.responseJSON.validationErrors) {
                err.responseJSON.validationErrors.forEach(valE => {
                    if (valE.msg !== 'Invalid value') {
                        toastr.error(`${valE.msg}`, 'Error de validacion')
                    } else {
                        toastr.error(`Field ${valE.param}: ${valE.msg}`, 'Error de validacion')
                    }
                });
                return;
            } else if (err.status !== 500 && err.responseJSON && err.responseJSON.message) {
                toastr.error(err.responseJSON.message, 'Error');
                return;
            }
            toastr.error(defaultMessage, 'Error')
        }

        $('button.deleteMyPost-big').on('click', function (e) {
            const deleteButton = $(this);
            const postId = deleteButton.data('postId');
            if (postId) {
                const eliminar = confirm('Estas seguro que deseas eliminar el post?');
                if (eliminar) {
                    $.ajax({
                        url: `/posts/${postId}`,
                        type: 'DELETE',
                    })
                        .done(() => {
                            toastr.info('El post seleccionado fue eliminado!', 'Exito');
                            const blogItem = deleteButton.parents('div.single-blog-post');
                            if (blogItem) {
                                blogItem.remove()
                            }
                        })
                        .fail(err => {
                            DisplayMessagesFromRequestError(err, 'Ocurrio un error tratando de eliminar el post!');
                            toastr.error('No se pudo eliminar eliminar el post seleccionado!', 'Error')
                        })
                }
            }
        });

        const editPostForm = $('form#edit-post');
        if (editPostForm) {
            editPostForm.on('submit', function (e) {
                e.preventDefault();
                console.log('Edit form', e);
                // toastr.error('Error', 'Error al intentar crear el post!');
                const postIdElement = editPostForm.find('input#postId');
                const postTitle = editPostForm.find('input#title');
                const postContent = editPostForm.find('#content');
                const postCategory = editPostForm.find('#categoryId');
                const postImageElement = editPostForm.find('#image');
                const postImageFiles = postImageElement[0].files;

                const postId = postIdElement.val();
                const data = new FormData();
                data.append('title', postTitle.val());
                data.append('content', postContent.val());
                data.append('categoryId', postCategory.val());
                if (postImageFiles !== undefined && postImageElement.length > 0) {
                    data.append('photo', postImageFiles[0]);
                }
                editPostForm.find('input').prop('disabled', true);
                editPostForm.find('textarea').prop('disabled', true);
                $.ajax({
                    url: `/posts/${postId}`,
                    type: "PATCH",
                    data,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false   // tell jQuery not to set contentType
                }).done(res => {
                    toastr.info('Tu post has sido editado con exito!', 'Exito');
                    setTimeout(() => {
                            window.open('./', '_self')
                        }, 1000
                    )
                }).fail(_err => {
                    DisplayMessagesFromRequestError(_err, 'Ocurrio un error al actualizar el post!');
                });
            })
        }

        function getFormData(form) {
            const dataArray = form.serializeArray();
            let dataObject = {};


            dataArray.forEach(field => {
                dataObject = {...dataObject, [field.name]: field.value}
            });

            return dataObject;
        }

        const registerForm = $('form#register-form');
        if (registerForm) {
            registerForm.on('submit', function (e) {
                e.preventDefault();
                const data = getFormData($(this));
                registerForm.find('input').prop('disabled', true);
                console.log('register', data);
                $.ajax({
                    url: `/register`,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: 'json'
                }).done(res => {
                    toastr.info('Te has registrado con exito!', 'Bienvenido');
                    setTimeout(() => {
                        window.open("/login", "_self")
                    }, 500)
                }).fail(err => {
                    registerForm.find('input').prop('disabled', false);
                    DisplayMessagesFromRequestError(err);
                });
            })
        }

        const eliminarPostButton = $('#eliminar-post');
        if (eliminarPostButton) {
            eliminarPostButton.on('click', () => {
                const postId = eliminarPostButton.data('postId');
                if (postId) {
                    const eliminar = confirm('Estas seguro que deseas eliminar el post?');
                    eliminarPostButton.prop('disabled', true);
                    if (eliminar) {
                        $.ajax({
                            url: `/posts/${postId}`,
                            type: 'DELETE',
                        })
                            .done(() => {
                                toastr.info('El post seleccionado fue eliminado!', 'Exito');

                                setTimeout(() => {

                                    window.open('/posts', '_self')
                                })
                            })
                            .fail(err => {
                                DisplayMessagesFromRequestError(err, 'Ocurrio un error tratando de eliminar el post!');
                            })
                    }
                }
            })
        }

        const btnDeleteUser = $('button.btn-delete-user');
        if (btnDeleteUser) {
            btnDeleteUser.on('click', function (e) {
                const deleteButton = $(this);
                const userId = deleteButton.data('userId');
                if (userId) {
                    const eliminar = confirm('Estas seguro que deseas eliminar el usuario junto con todos sus posts?');
                    if (eliminar) {
                        $.ajax({
                            url: `/users/${userId}`,
                            type: 'DELETE',
                        })
                            .done(() => {
                                toastr.info('El usuario seleccionado fue eliminado junto con todos sus posts!', 'Exito');
                                const tableRow = deleteButton.parents('tr');
                                if (tableRow) {
                                    tableRow.remove()
                                }
                            })
                            .fail(err => {
                                DisplayMessagesFromRequestError(err, 'Ocurrio un error tratando de eliminar el usuario!');
                            })
                    }
                }
            });
        }

        const getNewCommentHTML = (authorName, comment) => {
            return `
            <ol class="mb-4">
                <!-- Single Comment Area -->
                <li class="single_comment_area">
                    <!-- Comment Content -->
                    <div class="comment-content">
                        <!-- Comment Meta -->
                        <div class="comment-meta d-flex align-items-center justify-content-between">
                            <p>
                                <a href="#" class="post-author text-info">
                                    ${authorName}
                                </a>
                                creado 
                                 <a href="#" class="post-date">
                                    Hace un momento
                                </a>
                            </p>
                            <!--                                    <a href="#" class="comment-reply btn world-btn">Reply</a>-->
                        </div>
                        <p>
                            ${comment}
                        </p>
                    </div>
                </li>
            </ol>
            `
        };

        const addCommentForm = $('form#add-comment');
        if (addCommentForm) {
            addCommentForm.on('submit', function (e) {
                e.preventDefault();
                const data = getFormData($(this));
                addCommentForm.find('textarea#comment').prop('disabled', true);
                console.log('add comment', data);
                $.ajax({
                    url: `/posts/${data.postId}/comment`,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: 'json'
                }).done(res => {
                    toastr.info('Tu comentario ha sido añadido con exito!', 'Exito');
                    addCommentForm.find('textarea#comment').prop('disabled', false);
                    addCommentForm.find('textarea#comment').val('');
                    setTimeout(() => {
                        $('#comment_area').append(getNewCommentHTML(data.userFullName, data.comment))
                    }, 500)
                }).fail(err => {
                    addCommentForm.find('textarea#comment').prop('disabled', false);
                    DisplayMessagesFromRequestError(err, 'Error al añadir el comentario al post!');
                });
            })
        }
    }
)
(jQuery);
