package virtusa.vride.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import virtusa.vride.model.Employee;

@Service
public class NotificationService {

	private JavaMailSender javaMailSender;
	
	@Autowired
	public NotificationService(JavaMailSender javaMailSender) throws MailException {
		this.javaMailSender=javaMailSender;
	}
	
	public void sendNotification(Employee emp,Integer otp) {
		//send our email
		SimpleMailMessage mail=new SimpleMailMessage();
		
		mail.setTo(emp.getEmpEmail());
		mail.setFrom("vride18mca@gmail.com");
		mail.setSubject("OTP for Vride");
		mail.setText("Otp is "+otp);
		javaMailSender.send(mail);
	}
}
