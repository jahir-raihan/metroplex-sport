from django.test import TestCase


class UserTests(TestCase):

    """
    Test cases abstracted user model
    """

    def test_user_register(self):

        """
        Test user register view
        """
        pass

    def test_user_login(self):

        """
        Test user login view
        """
        pass

    def test_user_logout_view(self):

        """
        Test user logout view
        """
        pass

    def test_duplicated_account(self):

        """
        Test for duplicate account creation
        """
        pass

    def test_login_while_logged_in(self):

        """
        Test to check if a user is able to access and
        login while logged in.
        """
        pass

    def test_logout_while_not_signed_in(self):

        """
        Test if a user is able to access and logout while
        not signed in.
        """
        pass
