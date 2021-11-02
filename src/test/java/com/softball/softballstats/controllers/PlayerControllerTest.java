package com.softball.softballstats.controllers;

import com.softball.softballstats.SoftballStatsApplication;
import com.softball.softballstats.domain.Player;
import com.softball.softballstats.repositories.PlayerRepo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.stream.IntStream;

import static org.junit.Assert.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = SoftballStatsApplication.class)
public class PlayerControllerTest {

    private MockMvc mockMvc;

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype());

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    PlayerRepo playerRepo;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {
        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);
        Assert.assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
    }

    @Before
    public void setup() throws Exception {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();

        generateTestPlayers(7);
    }

    @Test
    public void readSingleByName() throws Exception {
        System.out.println("TESTING PLAYER BY ID");
        mockMvc.perform(get("/api/player/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstName", is("Socks")));
    }

    @Test
    public void createPlayer() throws Exception {
        Player buddy = new Player();
        buddy.setFirstName("Buddy");
        buddy.setLastName("Riddlesquirt");
        buddy.setWeight(240);
        buddy.setHeight("5'8");

        String buddyJson = json(buddy);

        mockMvc.perform(post("/api/player/")
                .contentType(contentType)
                .content(buddyJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstName", is("Buddy")))
                .andExpect(jsonPath("$.lastName", is("Riddlesquirt")))
                .andExpect(jsonPath("$.weight", is(240)))
                .andExpect(jsonPath("$.height", is("5'8")));
    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }

    public void generateTestPlayers(int num) {
        IntStream.range(1,num).forEach(i -> {
            Player player = new Player();
            player.setFirstName("Player" + i);
            player.setLastName("Player" + i);
            player.setWeight(175 + 2*i);
            player.setHeight("6'0");
            playerRepo.save(player);
        });
    }
}
