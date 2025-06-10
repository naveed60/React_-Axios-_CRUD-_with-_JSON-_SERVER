def create
  #----new jucachap [parametros GET enviados desde conexion movil]
  if params[:disp].nil?
    verify_authenticity_token
  end
  #----end jucachap

  cookies.delete :auth_token

  # forget password option
  if params[:emailpassword] == "1"
    # First: validate email format
    submitted_email = params[:login].to_s.strip
    unless submitted_email.match?(URI::MailTo::EMAIL_REGEXP)
      flash[:notice] = "Please enter a valid email address"
      @crumb = t('Breadcrumbs.forgot_password')
      respond_to do |format|
        format.html { render action: "forgotpassword" }
      end
      return
    end

    # Next: look up user by email
    @lsd_user = LsdUser.find_by_login(submitted_email)
    if @lsd_user
      # Generate new random password and send forgot‐password email
      @user_hash            = {}
      @user_hash["pswd"]    = LsdUser.rand_password
      @user_hash["login"]   = @lsd_user.login
      @user_hash["salt"]    = ""
      session[:locale]      = session[:locale] || I18n.default_locale
      I18n.locale           = session[:locale]

      LsdEmailer.with(
        recipient:       @lsd_user.login,
        recipient_login: @user_hash["login"],
        recipient_pswd:  @user_hash["pswd"],
        subject_txt:     I18n.t("Emailer.forgotpassword.txt_subject"),
        locale:          session[:locale],
        from:            I18n.t("section.app_name")
      ).forgotpassword.deliver_now

      @lsd_user.user_password = LsdUser.encrypt_updatepswd(@user_hash)
      @lsd_user.salt          = @user_hash["salt"]
      @lsd_user.save(validate: false) # skip validations

      flash[:forgotPswdEmail] = t('Emailer.forgotpassword.txt_notitication')
      redirect_to new_lsd_session_path
    else
      # User not found
      flash[:notice] = t('Emailer.forgotpassword.txt_information_not_found')
      @crumb = t('Breadcrumbs.forgot_password')
      respond_to do |format|
        format.html { render action: "forgotpassword" }
      end
    end

  else
    # Normal user‐creation flow
    params[:lsd_user][:activationcode] = LsdUser.make_activation_code
    @lsd_user = LsdUser.new(lsd_user_params)
    @lsd_user.user_email   = lsd_user_params[:login]
    @lsd_user.login        = lsd_user_params[:login]
    @lsd_user.activationcode = LsdUser.make_activation_code

    respond_to do |format|
      if @lsd_user.save
        self.current_lsd_user = @lsd_user
        create_user_profile
        send_welcome_email
        set_session_and_cookies

        # Handle optional cookie for channel selection
        @ch = cookies[:ch_selected].to_s.presence || ""
        cookies.delete :ch_selected
        format.html { redirect_to lsd_decisions_path(ch: @ch) }
      else
        # If request came from iPhone and JSON is expected
        if params[:disp] == "iphone"
          result_code = LsdUser.find_by_login(params[:lsd_user][:login]).nil? ? "" : ", \"code\" : \"1\""
          format.json { render text: "{ \"result\" : [ { \"status\" :  \"500\" #{result_code} } ] }", status: "500" }
        else
          @yearArray = []
          LsdUserprofile.birthday_year(@yearArray)
          @crumb = t('Breadcrumbs.user_registration')
          format.html { render action: "new" }
        end
      end
    end
  end
end
