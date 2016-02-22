var App = {
	    _isWithTooltips: !1,
	    init: function () {
	        App._tableSorters(),
			App._tooltips(),
			App._navDoc(),
			App._valiadateRegister(),
			App._valiadateLogin(),
			App._valiadateBlog(),
			App._textaeraInit(),
			$(window).on("resize", App._tooltips), $(document).on(
	            "shown.bs.tab", function () {
	            $(document).trigger("redraw.bs.charts")
	        }), $(".docs-top").length && (App._backToTopButton(), $(window).on("scroll", App._backToTopButton))
	    },
	    _navDoc: function () {
	        function o() {
	            e.width() > 768 ? i() : t()
	        }
	        function t() {
	            e.off("resize.theme.nav"), e.off("scroll.theme.nav"), n.css({
	                position: "",
	                left: "",
	                top: ""
	            })
	        }
	        function i() {
	            function o() {
	                i.containerTop = $(".docs-content").offset().top - 40, i.containerRight = $(".docs-content").offset().left +
	                    $(".docs-content").width() + 45, t()
	            }
	            function t() {
	                var o = e.scrollTop(),
	                    t = Math.max(o - i.containerTop, 0);
	                return t ? void n.css({
	                    position: "fixed",
	                    left: i.containerRight,
	                    top: 40
	                }) : ($(n.find("li")[1]).addClass("active"), n.css({
	                    position: "",
	                    left: "",
	                    top: ""
	                }))
	            }
	            var i = {};
	            o(), $(window).on("resize.theme.nav", o).on("scroll.theme.nav", t), $("body").scrollspy({
	                target: "#markdown-toc",
	                selector: "li > a"
	            }), setTimeout(function () {
	                $("body").scrollspy("refresh")
	            }, 1e3)
	        }
	        var n = $("#markdown-toc"),
	            e = $(window);
	        n[0] && (o(), e.on("resize", o))
	    },
	    _backToTopButton: function () {
	        $(window).scrollTop() > $(window).height() ? $(".docs-top").fadeIn() : $(".docs-top").fadeOut()
	    },
	    _tooltips: function () {
	        if ($(window).width() > 768) {
	            if (App._isWithTooltips) return;
	            App._isWithTooltips = !0, $('[data-toggle="tooltip"]').tooltip()
	        } else {
	            if (!App._isWithTooltips) return;
	            App._isWithTooltips = !1, $('[data-toggle="tooltip"]').tooltip("destroy")
	        }
	    },
	    _tableSorters: function () {
	        $('[data-sort="table"]').tablesorter({
	            sortList: [[1, 0]]
	        })
	    }, // 注册验证
		_valiadateRegister: function() {
			$('#registerForm').bootstrapValidator({
				container: 'tooltip',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					userEmail: {
						validators: {
							notEmpty: {
								message: '邮箱地址不能为空'
							},
							regexp: {
								enabled: true,
								regexp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
								message: '请输入正确的邮箱'
							}
						}
					},
					userPassword: {
						validators: {
							stringLength: {
								min: 8,
								message: '密码必须大于8位字符'
							},
							notEmpty: {
								message: '密码不能为空'
							},
							regexp: {
								regexp: /^^[a-zA-Z]\w{5,17}$/,
								message: '以字母开头.长度在6~18之间,只能包含字符,数字和下划线'
							}
						}
					},
					userRePassword: {
						validators: {
							stringLength: {
								min: 8,
								message: '密码必须大于8位字符'
							},
							notEmpty: {
								message: '密码不能为空'
							},
							regexp: {
								regexp: /^^[a-zA-Z]\w{5,17}$/,
								message: '以字母开头.长度在6~18之间,只能包含字符,数字和下划线'
							}
						}
					}
				}
			});
		}, // 写文章验证
		_valiadateBlog: function () {
			$("#blogForm").bootstrapValidator({
				feedbackIcons: {
					valid: "glyphicon glyphicon-ok",
					invalid: "glyphicon glyphicon-remove",
					validating: "glyphicon glyphicon-refresh"
				},
				fields: {
					blogTitle: {
						validators: {
							notEmpty: {
								message: "文章标题不能为空"
							}
						}
					},
					blogContent: {
						validators: {
							stringLength: {
								min: 20,
								message: "文章内容不能小于20个字符"
							},
							notEmpty: {
								message: "文章内容不能为空"
							}
						}
					}
				}
			})
		}, // 验证初始化
		_textaeraInit: function () {
			var a = new Mditor("#blogContent", {
				height: 500,
				toggleFullScreen: false
			});
		}, // 登录验证
		_valiadateLogin: function() {
			$('#loginForm').bootstrapValidator({
				container: 'tooltip',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					userEmail: {
						validators: {
							notEmpty: {
								message: '邮箱地址不能为空'
							},
							regexp: {
								enabled: true,
								regexp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
								message: '请输入正确的邮箱'
							}
						}
					},
					userPassword: {
						validators: {
							notEmpty: {
								message: '密码不能为空'
							}
						}
					}
				}
			});
		}
	};
	App.init();
	
	
