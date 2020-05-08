
package virtusa.vride.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Rider2 {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long riderId;
	
	public Long getRiderId() {
		return riderId;
	}

	public void setRiderId(Long riderId) {
		this.riderId = riderId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Pooling getPooling() {
		return pooling;
	}

	public void setPooling(Pooling pooling) {
		this.pooling = pooling;
	}

	@ManyToOne
	private Employee employee;
	
	@OneToOne
	private Pooling pooling;
	
	
}
